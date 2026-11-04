"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@crossmotiveservices.com");
  const [password, setPassword] = useState("ChangeMeInProduction2026!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full bg-surface-card border border-border rounded-2xl p-8 sm:p-10 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-surface-dark text-white flex items-center justify-center mx-auto mb-3 font-bold text-sm tracking-wider">
            CM
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Secure Administrator Portal
          </span>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            Cross Motive Studio
          </h1>
          <p className="text-xs text-muted">
            Authenticate to access content management, project case studies, and incoming client enquiries.
          </p>
        </div>

        {error && (
          <Alert type="error" title="Authentication Error">
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Administrator Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="p-4 rounded-lg bg-surface-muted/60 border border-border/60 text-xs text-muted space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Info className="w-3.5 h-3.5 text-accent" />
            <span>Development Setup Note</span>
          </div>
          <p className="leading-relaxed">
            Default credentials are pre-filled for local evaluation:
            <br />
            <strong className="text-foreground">Email:</strong> admin@crossmotiveservices.com
            <br />
            <strong className="text-foreground">Password:</strong> ChangeMeInProduction2026!
          </p>
          <p className="text-[11px] text-muted pt-1 border-t border-border/40">
            Override with <code className="font-mono text-accent">ADMIN_DEFAULT_PASSWORD</code> in your <code className="font-mono">.env.local</code> or configure Supabase Auth for production.
          </p>
        </div>
      </div>
    </div>
  );
}
