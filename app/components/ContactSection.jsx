"use client";

import { useState } from "react";

const businessTypes = [
  "Driving School",
  "Dental / Medical",
  "Med Spa / Wellness",
  "Salon / Hair Studio",
  "Real Estate",
  "Restaurant / Catering",
  "Other",
];

const customPerks = [
  { color: "#F5A623", text: "Dedicated onboarding & setup call" },
  { color: "#22D3EE", text: "Custom AI training on your business data" },
  { color: "#10B981", text: "White-glove integrations with your existing tools" },
  { color: "#A78BFA", text: "Priority support & dedicated account manager" },
  { color: "#F5A623", text: "Volume pricing for multi-location businesses" },
  { color: "#22D3EE", text: "Custom workflows built around your team" },
];

const inputClass =
  "w-full rounded-lg border border-[#1A2540] bg-[#060911] px-4 py-3 text-[14px] text-white placeholder:text-[#64748B] outline-none transition-all focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/20";

const labelClass =
  "block font-mono-custom text-[10px] uppercase tracking-[2px] text-[#64748B] mb-1.5";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", businessName: "", businessType: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto py-20 px-6 md:px-12">
      {/* Section label */}
      <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4 flex items-center gap-1">
        <span className="text-[#1E2D42]">//</span>Custom Plan
      </div>

      <h2 className="font-syne text-[clamp(32px,4vw,52px)] font-extrabold tracking-tighter text-white mb-4">
        Need something tailored?
        <br />
        <em className="text-[#F5A623] not-italic">Let&apos;s build it.</em>
      </h2>

      <p className="text-base text-[#64748B] max-w-[480px] mb-14">
        Agencies, multi-location businesses, and unique verticals — tell us what you need and
        we&apos;ll craft a plan around your operation.
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">

        {/* Left — perks */}
        <div>
          <div className="space-y-4 mb-10">
            {customPerks.map((perk) => (
              <div key={perk.text} className="flex items-start gap-3">
                <div
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: perk.color, boxShadow: `0 0 6px ${perk.color}` }}
                />
                <span className="text-[14px] text-[#94A3B8] leading-relaxed">{perk.text}</span>
              </div>
            ))}
          </div>

          {/* Social proof card */}
          <div className="rounded-xl border border-[#1A2540] bg-[#0C1220] p-6">
            <div className="font-mono-custom text-[9px] uppercase tracking-[2px] text-[#64748B] mb-3">
              Currently serving
            </div>
            <div className="flex items-end gap-3 mb-1">
              <span className="font-syne text-[40px] font-extrabold leading-none tracking-tighter text-[#F5A623]">
                6+
              </span>
              <span className="text-[13px] text-[#64748B] pb-1.5">industries, DMV &amp; growing</span>
            </div>
            <div className="mt-4 h-px bg-[#1A2540]" />
            <div className="mt-4 text-[13px] text-[#64748B] leading-relaxed italic">
              &ldquo;We needed something custom for our multi-instructor booking flow.
              Smart SMB Hub built it in a week.&rdquo;
            </div>
            <div className="mt-2 font-mono-custom text-[10px] text-[#F5A623]">
              — Driving school owner, Fairfax VA
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="relative rounded-2xl border border-[#243050] bg-[#0C1220] p-8 shadow-[0_0_60px_rgba(245,166,35,0.05)]">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent" />

          {status === "success" ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Your Name</label>
                  <input
                    className={inputClass}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Business Name</label>
                  <input
                    className={inputClass}
                    type="text"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder="Nest Driving School"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Business Type</label>
                <select
                  className={`${inputClass} cursor-pointer`}
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your industry</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@business.com"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    className={inputClass}
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (703) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>What do you need?</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business, team size, current tools, and what you're looking for..."
                  rows={4}
                  required
                />
              </div>

              {status === "error" && (
                <p className="text-[13px] text-red-400">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-[#F5A623] py-3.5 font-syne text-[15px] font-bold text-[#060911] shadow-[0_0_40px_rgba(245,166,35,0.25)] transition-all hover:bg-[#E09018] hover:shadow-[0_0_60px_rgba(245,166,35,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Request Custom Plan →"}
              </button>

              <p className="text-center text-[11px] text-[#64748B]">
                We reply within 24 hours. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-2xl">
        ✓
      </div>
      <div className="font-syne text-[22px] font-extrabold text-white mb-2">
        Message sent!
      </div>
      <p className="text-[14px] text-[#64748B] max-w-[280px] leading-relaxed">
        We&apos;ll review your details and get back to you within 24 hours with a tailored plan.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
        <span className="font-mono-custom text-[10px] text-[#10B981]">Request received</span>
      </div>
    </div>
  );
}
