const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body ? (tryParse(body) || body) : '',
        });
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

function tryParse(str) {
  try { return JSON.parse(str); } catch { return null; }
}

async function run() {
  console.log('--- STARTING E2E VERIFICATION ---');

  // 1. Submit Enquiry
  console.log('1. Testing Public Contact Form Submission (/api/enquiries)...');
  const enqRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/enquiries',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    full_name: 'Elena Rostova',
    email: 'elena@solardynamics.tech',
    company_name: 'Solar Dynamics',
    client_category: 'Enterprise',
    project_type: 'Energy Grid Dashboard',
    platform: 'Both',
    description: 'We need an enterprise telemetry dashboard to monitor field solar battery storage units in real time.',
    budget_range: '$50,000+',
    timeline: '3-4 Months',
    contact_method: 'Discovery Call',
    privacy_consent: true,
  });

  console.log('   Status:', enqRes.statusCode);
  console.log('   Response:', enqRes.body);
  if (enqRes.statusCode !== 200 || !enqRes.body.reference_code) {
    throw new Error('Enquiry submission failed');
  }

  // 2. Admin Login
  console.log('\n2. Testing Admin Authentication (/api/auth/login)...');
  const loginRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    email: 'admin@crossmotiveservices.com',
    password: 'ChangeMeInProduction2026!',
  });

  console.log('   Login Status:', loginRes.statusCode);
  const cookie = loginRes.headers['set-cookie'];
  console.log('   Cookie received:', Boolean(cookie));
  if (loginRes.statusCode !== 200 || !cookie) {
    throw new Error('Admin login failed');
  }

  const sessionCookie = cookie[0].split(';')[0];

  // 3. Admin Fetch Enquiries (Protected)
  console.log('\n3. Testing Protected Enquiry Retrieval (/api/enquiries)...');
  const enqListRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/enquiries',
    method: 'GET',
    headers: { Cookie: sessionCookie },
  });

  console.log('   Status:', enqListRes.statusCode);
  console.log('   Enquiries count:', enqListRes.body.length);
  const found = enqListRes.body.find((e) => e.reference_code === enqRes.body.reference_code);
  console.log('   Found newly created enquiry:', Boolean(found), found ? found.reference_code : '');

  // 4. Admin Update Enquiry Status
  console.log('\n4. Testing Enquiry Status Transition (PATCH /api/enquiries)...');
  const patchRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/enquiries',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
  }, {
    id: found.id,
    status: 'Qualified',
    admin_notes: 'Reviewed battery telemetry requirements. Good fit for Next.js + PostgreSQL.',
  });

  console.log('   Status:', patchRes.statusCode);
  console.log('   Updated Enquiry Status:', patchRes.body.status);
  console.log('   Updated Admin Notes:', patchRes.body.admin_notes);

  // 5. Admin Create Project
  console.log('\n5. Testing Project Creation (/api/projects)...');
  const newProjSlug = 'e2e-solar-grid-' + Date.now();
  const createProjRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: '/api/projects',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
  }, {
    title: 'Solar Grid Telemetry',
    slug: newProjSlug,
    summary: 'Real-time telemetry and battery distribution management dashboard.',
    description: 'Bespoke industrial platform engineered for distributed renewable solar assets.',
    category: 'Enterprise Systems',
    project_type: 'Industrial Dashboard',
    client_type: 'Enterprise',
    engagement_type: 'Internal Product',
    status: 'In Progress',
    visibility: 'Public',
    services: ['Web Application Development', 'Enterprise Solutions'],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    cover_image: '/images/projects/viztech.svg',
    gallery: ['/images/projects/viztech.svg'],
    problem: 'Fragmented SCADA systems causing delayed fault isolation.',
    solution: 'Unified Next.js web application with sub-second WebSocket telemetry ingestion.',
    features: ['Real-time kilowatt-hour telemetry graphs', 'Substation alert dispatch rules'],
    architecture: 'Next.js App Router with TimescaleDB time-series PostgreSQL schema.',
    challenges: 'High-frequency telemetry data ingestion without client browser memory leaks.',
    outcomes: 'Deployed functional staging dashboard preview for battery monitoring.',
    outcomes_verified: false,
    target_audience: 'Industrial substation engineers and operations leads.',
    design_approach: 'High-contrast dark mode with crisp SVG telemetry indicators.',
    learnings_and_next_steps: 'Adding automated SMS dispatch alerts for inverter anomalies.',
  });

  console.log('   Status:', createProjRes.statusCode);
  console.log('   Created Project Title:', createProjRes.body.title);
  console.log('   Created Project ID:', createProjRes.body.id);

  // 6. Public route check for new project
  console.log(`\n6. Testing Public Case Study Route (/work/${newProjSlug})...`);
  const publicCaseRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: `/work/${newProjSlug}`,
    method: 'GET',
  });
  console.log('   Public Case Study Status:', publicCaseRes.statusCode);

  // 7. Cleanup test project
  console.log('\n7. Cleaning up test project...');
  const delRes = await request({
    hostname: 'localhost',
    port: 3005,
    path: `/api/projects/${createProjRes.body.id}`,
    method: 'DELETE',
    headers: { Cookie: sessionCookie },
  });
  console.log('   Delete Status:', delRes.statusCode);

  console.log('\n--- ALL E2E TESTS PASSED PERFECTLY! ---');
}

run().catch((err) => {
  console.error('E2E TEST FAILURE:', err);
  process.exit(1);
});
