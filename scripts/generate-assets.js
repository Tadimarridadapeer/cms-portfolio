const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'images', 'projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function makeSvg(title, subtitle, accentColor, type = 'desktop', variant = 1) {
  const isMobile = type === 'mobile';
  const width = 800;
  const height = 500;

  if (isMobile) {
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#101114"/>
      <!-- Grid pattern -->
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#22242A" stroke-width="0.5"/>
        </pattern>
        <linearGradient id="grad" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
          <stop stop-color="${accentColor}" stop-opacity="0.15"/>
          <stop offset="1" stop-color="#101114" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      
      <!-- Mobile Phone Frame -->
      <g transform="translate(275, 40)">
        <rect width="250" height="420" rx="36" fill="#17181D" stroke="#2D3039" stroke-width="2"/>
        <rect x="85" y="12" width="80" height="18" rx="9" fill="#0A0B0D"/>
        <!-- Screen Content -->
        <rect x="16" y="42" width="218" height="360" rx="24" fill="#0E0F12"/>
        <!-- App Header -->
        <rect x="30" y="58" width="80" height="10" rx="4" fill="#E4E4E1"/>
        <circle cx="216" cy="63" r="10" fill="#22242A"/>
        
        <!-- Main Card -->
        <rect x="30" y="85" width="190" height="110" rx="12" fill="#17181D" stroke="#2A2C35" stroke-width="1"/>
        <rect x="42" y="100" width="100" height="12" rx="4" fill="${accentColor}"/>
        <rect x="42" y="122" width="150" height="8" rx="3" fill="#66686D"/>
        <rect x="42" y="138" width="130" height="8" rx="3" fill="#3D404A"/>
        <rect x="42" y="162" width="70" height="20" rx="6" fill="#2A2C35"/>

        <!-- Feed Items -->
        <rect x="30" y="210" width="190" height="56" rx="8" fill="#15161B"/>
        <circle cx="50" cy="238" r="12" fill="${accentColor}" fill-opacity="0.2"/>
        <rect x="72" y="228" width="90" height="8" rx="3" fill="#C5C7CC"/>
        <rect x="72" y="242" width="130" height="6" rx="3" fill="#4B4E59"/>

        <rect x="30" y="278" width="190" height="56" rx="8" fill="#15161B"/>
        <circle cx="50" cy="306" r="12" fill="#2D3039"/>
        <rect x="72" y="296" width="100" height="8" rx="3" fill="#C5C7CC"/>
        <rect x="72" y="310" width="115" height="6" rx="3" fill="#4B4E59"/>

        <!-- Tab Bar -->
        <rect x="16" y="360" width="218" height="42" fill="#121317"/>
        <circle cx="65" cy="380" r="6" fill="${accentColor}"/>
        <circle cx="125" cy="380" r="6" fill="#3D404A"/>
        <circle cx="185" cy="380" r="6" fill="#3D404A"/>
      </g>

      <!-- Label Watermark -->
      <text x="40" y="460" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#E4E4E1" letter-spacing="1.5">${title.toUpperCase()}</text>
      <text x="40" y="480" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#66686D">${subtitle}</text>
    </svg>`;
  }

  // Desktop / Dashboard style
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#101114"/>
    <defs>
      <pattern id="grid-desk" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#22242A" stroke-width="0.5"/>
      </pattern>
      <linearGradient id="glow" x1="100" y1="50" x2="700" y2="450" gradientUnits="userSpaceOnUse">
        <stop stop-color="${accentColor}" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#101114" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grid-desk)"/>
    <rect width="${width}" height="${height}" fill="url(#glow)"/>

    <!-- Browser / App Window Mockup -->
    <g transform="translate(60, 45)">
      <!-- Window Shadow / Border -->
      <rect width="680" height="390" rx="12" fill="#14151A" stroke="#2D3039" stroke-width="1"/>
      
      <!-- Window Header Bar -->
      <path d="M0 12C0 5.37258 5.37258 0 12 0H668C674.627 0 680 5.37258 680 12V36H0V12Z" fill="#1C1D24"/>
      <circle cx="20" cy="18" r="4" fill="#FF5F56"/>
      <circle cx="34" cy="18" r="4" fill="#FFBD2E"/>
      <circle cx="48" cy="18" r="4" fill="#27C93F"/>
      <!-- Search/Address Bar -->
      <rect x="80" y="8" width="340" height="20" rx="5" fill="#101114" stroke="#2B2D36" stroke-width="1"/>
      <text x="96" y="22" font-family="monospace" font-size="9" fill="#71747F">${title.toLowerCase().replace(/[^a-z0-9]/g, '')}.crossmotive.internal/v${variant}</text>

      <!-- App Body Sidebar + Main Grid -->
      <!-- Sidebar -->
      <rect x="0" y="36" width="130" height="354" fill="#17181F"/>
      <rect x="18" y="54" width="70" height="8" rx="2" fill="#4B4E5A"/>
      <rect x="18" y="74" width="94" height="18" rx="4" fill="${accentColor}" fill-opacity="0.2"/>
      <rect x="28" y="79" width="60" height="8" rx="2" fill="${accentColor}"/>
      <rect x="18" y="104" width="75" height="8" rx="2" fill="#383A44"/>
      <rect x="18" y="124" width="65" height="8" rx="2" fill="#383A44"/>
      <rect x="18" y="144" width="85" height="8" rx="2" fill="#383A44"/>

      <!-- Main Stage -->
      <!-- Top banner in app -->
      <rect x="150" y="52" width="510" height="75" rx="8" fill="#1A1C23" stroke="#282A33" stroke-width="1"/>
      <text x="170" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">${title}</text>
      <text x="170" y="103" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#8E929E">${subtitle}</text>

      <!-- Cards Grid -->
      <rect x="150" y="142" width="245" height="110" rx="8" fill="#1A1C23" stroke="#282A33" stroke-width="1"/>
      <circle cx="174" cy="166" r="10" fill="${accentColor}" fill-opacity="0.2"/>
      <rect x="195" y="161" width="80" height="10" rx="3" fill="#FFFFFF"/>
      <!-- Metric chart mockup -->
      <polyline points="170,225 210,215 250,228 290,195 330,205 370,185" fill="none" stroke="${accentColor}" stroke-width="2.5"/>
      <polyline points="170,225 210,215 250,228 290,195 330,205 370,185 370,235 170,235" fill="${accentColor}" fill-opacity="0.08"/>

      <rect x="415" y="142" width="245" height="110" rx="8" fill="#1A1C23" stroke="#282A33" stroke-width="1"/>
      <circle cx="439" cy="166" r="10" fill="#2E313C"/>
      <rect x="460" y="161" width="100" height="10" rx="3" fill="#D3D5DC"/>
      <rect x="439" y="190" width="200" height="8" rx="3" fill="#2C2E38"/>
      <rect x="439" y="206" width="160" height="8" rx="3" fill="#242630"/>
      <rect x="439" y="222" width="180" height="8" rx="3" fill="#242630"/>

      <!-- Bottom data table or feed -->
      <rect x="150" y="266" width="510" height="105" rx="8" fill="#1A1C23" stroke="#282A33" stroke-width="1"/>
      <rect x="170" y="284" width="120" height="10" rx="3" fill="#71747F"/>
      <line x1="170" y1="304" x2="640" y2="304" stroke="#282A33" stroke-width="1"/>
      <rect x="170" y="318" width="180" height="8" rx="3" fill="#E4E4E1"/>
      <rect x="560" y="316" width="70" height="16" rx="4" fill="${accentColor}" fill-opacity="0.25"/>
      <rect x="170" y="340" width="210" height="8" rx="3" fill="#66686D"/>
      <rect x="560" y="338" width="55" height="16" rx="4" fill="#282A33"/>
    </g>
  </svg>`;
}

const projects = [
  { slug: 'writersthing', title: 'Writersthing', subtitle: 'Publishing & Editorial Community Platform', color: '#5B6CFF', type: 'desktop' },
  { slug: 'pstylst', title: 'P’STYLST', subtitle: 'Personal Styling Intelligence Engine', color: '#FF7A59', type: 'mobile' },
  { slug: 'intrly', title: 'Intrly', subtitle: 'AI Voice & Behavioral Interview Platform', color: '#5B6CFF', type: 'desktop' },
  { slug: 'gathering', title: 'The Gathering Co.', subtitle: 'Event Planning & Marketplace Directory', color: '#10B981', type: 'desktop' },
  { slug: 'yokarna', title: 'YoKarna', subtitle: 'Pure-Vegetarian Culinary Discovery', color: '#F59E0B', type: 'mobile' },
  { slug: 'viztech', title: 'VizTech India', subtitle: 'Enterprise Technology Services Portal', color: '#5B6CFF', type: 'desktop' },
  { slug: 'alphafitness', title: 'Alpha Fitness Pro', subtitle: 'Strength Training Telemetry & Analytics', color: '#06B6D4', type: 'mobile' },
  { slug: 'advocate', title: 'Book My Advocate', subtitle: 'Legal Consultation Discovery & Scheduling', color: '#8B5CF6', type: 'desktop' },
  { slug: 'tapai', title: 'TapAi', subtitle: 'System-Wide Contextual AI Assistant', color: '#EC4899', type: 'desktop' },
];

for (const p of projects) {
  fs.writeFileSync(path.join(outDir, `${p.slug}.svg`), makeSvg(p.title, p.subtitle, p.color, p.type, 1), 'utf-8');
  fs.writeFileSync(path.join(outDir, `${p.slug}-1.svg`), makeSvg(p.title, `${p.subtitle} (Architecture)`, p.color, p.type, 1), 'utf-8');
  fs.writeFileSync(path.join(outDir, `${p.slug}-2.svg`), makeSvg(p.title, `${p.subtitle} (Telemetry & Flow)`, p.color, p.type, 2), 'utf-8');
}

console.log('Project SVG assets created successfully in public/images/projects/');
