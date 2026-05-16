// components/CaseStudy.jsx
"use client";

import { useEffect, useRef, useState } from "react";

const clients = [
  {
    name: "Driving School Owner",
    location: "Annandale, VA · DMV Area",
    industry: "Driving School",
    quote:
      "Before Smart SMB Hub, I was missing calls every single day. Now my AI receptionist answers 24/7 — I haven't missed a lead in weeks. Setup took less than an hour.",
    tags: ["AI Receptionist", "Lead Automation", "Follow-up Sequences"],
    results: [
      { label: "Lead Response Time", before: "6 hrs", after: "<90s", note: "Down 94%" },
      { label: "Receptionist Coverage", before: "9–5", after: "24/7", note: "Nova answers every call" },
      { label: "Lead Capture Rate", before: "~40%", after: "100%", note: "Every lead logged & followed up" },
    ],
    color: "#10B981",
  },
  {
    name: "Salon & Spa Owner",
    location: "Arlington, VA · DMV Area",
    industry: "Beauty & Wellness",
    quote:
      "We used to lose bookings because no one could answer the phone during busy hours. Smart SMB Hub's AI handles everything — bookings, FAQs, reminders. Our no-show rate dropped overnight.",
    tags: ["Booking Automation", "SMS Reminders", "AI Chat"],
    results: [
      { label: "No-show Rate", before: "28%", after: "6%", note: "Automated reminders" },
      { label: "Bookings Per Week", before: "42", after: "71", note: "+69% increase" },
      { label: "Hours Saved/Week", before: "0", after: "12hrs", note: "Zero manual follow-up" },
    ],
    color: "#A78BFA",
  },
  {
    name: "HVAC Business Owner",
    location: "Bethesda, MD · DMV Area",
    industry: "HVAC",
    quote:
      "Emergency calls at 2am used to go to voicemail. Now our AI receptionist triages every call, captures the lead, and sends me a summary instantly. We closed 3 jobs last week from after-hours calls alone.",
    tags: ["24/7 AI Receptionist", "Lead Triage", "Instant Notifications"],
    results: [
      { label: "After-Hours Leads Captured", before: "0%", after: "100%", note: "AI never sleeps" },
      { label: "Response Time", before: "Next day", after: "<2 min", note: "Instant AI triage" },
      { label: "Monthly Revenue Lift", before: "—", after: "+$4,200", note: "From captured leads" },
    ],
    color: "#22D3EE",
  },
  {
    name: "Real Estate Agent",
    location: "Washington, DC",
    industry: "Real Estate",
    quote:
      "Leads from Zillow and Realtor.com used to sit for hours before I could call back. Smart SMB Hub auto-responds in seconds and nurtures them until I'm ready. My conversion rate went up 40%.",
    tags: ["Lead Nurturing", "Auto-Response", "CRM Integration"],
    results: [
      { label: "Lead Response Speed", before: "3–4 hrs", after: "30 sec", note: "Instant AI response" },
      { label: "Lead Conversion Rate", before: "11%", after: "31%", note: "+40% improvement" },
      { label: "Hours Saved/Month", before: "0", after: "20hrs", note: "No manual follow-up" },
    ],
    color: "#F5A623",
  },
];

export default function CaseStudy() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const intervalRef = useRef(null);

  const goTo = (idx, dir = "right") => {
    if (animating || idx === active) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((active + 1) % clients.length, "right");
  const prev = () => goTo((active - 1 + clients.length) % clients.length, "left");

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const client = clients[active];

  return (
    <div id="results" className="max-w-6xl mx-auto py-20 px-6 md:px-12">
      <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4">
        Real Results
      </div>

      <h2 className="font-syne text-[clamp(32px,4vw,52px)] font-extrabold tracking-tighter text-white mb-4">
        Not a concept.<br />
        <em className="text-[#F5A623] not-italic">Already working.</em>
      </h2>

      <p className="text-base text-[#64748B] max-w-[500px] mb-10">
        Real businesses across the DMV using Smart SMB Hub to capture more leads, save time, and win more customers — automatically.
      </p>

      {/* Slide container */}
      <div className="relative overflow-hidden">
        <div
          className="grid md:grid-cols-2 bg-[#0C1220] border border-[#243050] rounded-2xl overflow-hidden shadow-xl transition-all duration-300"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "right" ? "40px" : "-40px"})`
              : "translateX(0)",
          }}
        >
          {/* Left */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#1A2540]">
            <div className="inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 mb-5 border"
              style={{
                background: `${client.color}15`,
                borderColor: `${client.color}40`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: client.color }} />
              <span className="text-xs font-medium" style={{ color: client.color }}>
                Live in Production &middot; {client.industry}
              </span>
            </div>

            <div className="font-syne text-2xl font-extrabold text-white mb-1">
              {client.name}
            </div>
            <div className="text-sm text-[#64748B] mb-5">{client.location}</div>

            <blockquote className="text-[15px] text-[#94A3B8] leading-relaxed mb-6 italic border-l-2 pl-4" style={{ borderColor: client.color }}>
              &ldquo;{client.quote}&rdquo;
            </blockquote>

            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded border border-[#1A2540] text-xs font-mono-custom text-[#64748B]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="p-8 md:p-12 bg-[#111927] flex flex-col gap-6">
            {client.results.map((r, i) => (
              <div key={i}>
                <div className="font-mono-custom text-[9px] text-[#64748B] uppercase tracking-wider">{r.label}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-syne text-2xl font-bold text-[#1E2D42] line-through">{r.before}</span>
                  <span className="text-[#F5A623] text-xl">→</span>
                  <span className="font-syne text-3xl font-extrabold" style={{ color: client.color }}>{r.after}</span>
                </div>
                <div className="text-xs text-[#64748B]">{r.note}</div>
                {i < client.results.length - 1 && <div className="mt-5 h-px bg-[#1A2540]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {clients.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? "right" : "left")}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "32px" : "8px",
                  background: i === active ? client.color : "#1A2540",
                }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-[#243050] bg-[#0C1220] flex items-center justify-center text-[#64748B] hover:border-[#F5A623] hover:text-[#F5A623] transition-all"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-[#243050] bg-[#0C1220] flex items-center justify-center text-[#64748B] hover:border-[#F5A623] hover:text-[#F5A623] transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
