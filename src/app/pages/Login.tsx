"use client";

import * as React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, ShieldCheck, ArrowRight } from "lucide-react";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
}

const colors = ["#facc15", "#22c55e", "#3b82f6", "#f472b6", "#f97316"];

export default function GamifiedLoginCard() {
  const navigate = useNavigate();
  const [role, setRole] = React.useState<"staff" | "client">("staff");
  const [email, setEmail] = React.useState("faizan.haider@lawfirmpro.com");
  const [password, setPassword] = React.useState("••••••••");
  const [success, setSuccess] = React.useState(false);
  const [particles, setParticles] = React.useState<ConfettiParticle[]>([]);

  // Update demo credentials when role changes
  const handleRoleChange = (newRole: "staff" | "client") => {
    setRole(newRole);
    if (newRole === "staff") {
      setEmail("faizan.haider@lawfirmpro.com");
      setPassword("faizan123");
    } else {
      setEmail("fatima.zahra@client.com");
      setPassword("fatima123");
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !password) return;

    // Save authorized role in localStorage
    localStorage.setItem("userRole", role);
    localStorage.setItem(
      "userName",
      role === "staff" ? "Muhammad Faizan Haider" : "Fatima Zahra"
    );

    // Trigger confetti
    const newParticles: ConfettiParticle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      rotate: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
    setSuccess(true);

    // Redirect strictly based on authenticated role
    setTimeout(() => {
      setParticles([]);
      if (role === "staff") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/client", { replace: true });
      }
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Confetti */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-3 h-3 rounded-full z-50 pointer-events-none"
            style={{ backgroundColor: p.color }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: p.rotate }}
            animate={{
              x: (Math.random() - 0.5) * 200,
              y: -Math.random() * 250,
              scale: 0,
              opacity: 0,
              rotate: p.rotate + Math.random() * 360,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">
            Legal Case System
          </span>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mt-1">
            {success ? "Welcome Back!" : "Sign In"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {role === "staff"
              ? "Staff & Attorney Portal — Muhammad Faizan Haider"
              : "Client Portal — Fatima Zahra"}
          </p>
        </div>

        {/* Role Selector: Staff vs Client */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Select Role
          </Label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-700/60 rounded-xl border border-gray-200/60 dark:border-gray-600/50">
            <button
              type="button"
              onClick={() => handleRoleChange("staff")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "staff"
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Staff</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("client")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "client"
                  ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Client</span>
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="email">Email</Label>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                {role === "staff" ? "Muhammad Faizan Haider" : "Fatima Zahra"}
              </span>
            </div>
            <Input
              id="email"
              type="email"
              placeholder={role === "staff" ? "faizan.haider@lawfirmpro.com" : "fatima.zahra@client.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="hover:scale-[1.02] focus:scale-[1.02] transition-transform duration-200"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                Forgot?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="hover:scale-[1.02] focus:scale-[1.02] transition-transform duration-200"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2 h-11 text-base font-semibold shadow-md shadow-blue-500/20 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={success}
          >
            {success ? (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Authenticated! Redirecting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Login as {role === "staff" ? "Staff" : "Client"}
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {!success && (
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Sign up
              </a>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {role === "staff"
                ? "Logged as Staff: Strictly access the Firm Management Dashboard."
                : "Logged as Client: Strictly access your Client Case Portal."}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
