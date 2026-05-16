// app/contact/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

const subjects = [
  "Getting started",
  "Agency / Enterprise plan",
  "Technical support",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", business: "", subject: subjects[0], message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-[#060911] pt-24 pb-16 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px]">

        <div className="mb-12">
          <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4">Contact</div>
          <h1 className="font-syne text-[clamp(32px,5vw,60px)] font-extrabold tracking-tighter text-white mb-4">
            {"Let's talk."}
            <br />
            <em className="text-[#F5A623] not-italic">We reply fast.</em>
          </h1>
          <p className="text-[#64748B] text-base max-w-[480px]">
            Whether you want to start a free trial, need a custom Agency plan, or just have questions — reach out and we will get back to you within a few hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">

          <div className="md:col-span-2 flex flex-col gap-4">
            {[
              { icon: "⚡", title: "Fast replies", desc: "We respond within a few hours — usually sooner." },
              { icon: "🤖", title: "Live demo", desc: "Ask us for a live demo of the AI receptionist on your business." },
              { icon: "📍", title: "DMV Area", desc: "Based in the Washington DC metro area — local first." },
              { icon: "📧", title: "Email us directly", desc: "hasaank192@gmail.com", link: "mailto:hasaank192@gmail.com" },
            ].map((card, i) => (
              <div key={i} className="bg-[#0C1220] border border-[#1A2540] rounded-xl p-5 hover:border-[#243050] transition-all">
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="font-syne text-white font-bold text-[14px] mb-1">{card.title}</div>
                {card.link ? (
                  <a href={card.link} className="text-[#F5A623] text-[13px] hover:underline">{card.desc}</a>
                ) : (
                  <p className="text-[#64748B] text-[13px]">{card.desc}</p>
                )}
              </div>
            ))}
          </div>

          <div className="md:col-span-3 bg-[#0C1220] border border-[#243050] rounded-2xl p-8 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-2xl mb-4">✓</div>
                <div className="font-syne text-white font-extrabold text-2xl mb-2">Message sent!</div>
                <p className="text-[#64748B] text-sm mb-6">{"We'll get back to you within a few hours."}</p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", business: "", subject: subjects[0], message: "" }); }}
                  className="text-[#F5A623] text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="font-syne text-white font-bold text-xl mb-2">Send us a message</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-[#94A3B8] mb-1.5 font-medium">Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith"
                      className="w-full px-4 py-2.5 bg-[#060911] border border-[#1A2540] rounded-lg text-[13px] text-white placeholder:text-[#334155] focus:outline-none focus:border-[#F5A623] transition" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#94A3B8] mb-1.5 font-medium">Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@business.com"
                      className="w-full px-4 py-2.5 bg-[#060911] border border-[#1A2540] rounded-lg text-[13px] text-white placeholder:text-[#334155] focus:outline-none focus:border-[#F5A623] transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-[#94A3B8] mb-1.5 font-medium">Business Name</label>
                  <input name="business" value={form.business} onChange={handleChange} placeholder="Your business or company"
                    className="w-full px-4 py-2.5 bg-[#060911] border border-[#1A2540] rounded-lg text-[13px] text-white placeholder:text-[#334155] focus:outline-none focus:border-[#F5A623] transition" />
                </div>

                <div>
                  <label className="block text-[12px] text-[#94A3B8] mb-1.5 font-medium">What can we help with?</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#060911] border border-[#1A2540] rounded-lg text-[13px] text-white focus:outline-none focus:border-[#F5A623] transition">
                    {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] text-[#94A3B8] mb-1.5 font-medium">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your business and what you want to automate..."
                    className="w-full px-4 py-2.5 bg-[#060911] border border-[#1A2540] rounded-lg text-[13px] text-white placeholder:text-[#334155] focus:outline-none focus:border-[#F5A623] transition resize-none" />
                </div>

                <button type="submit" disabled={status === "sending"}
                  className="w-full py-3 rounded-lg bg-[#F5A623] text-[#060911] font-syne font-bold text-[14px] shadow-[0_0_30px_rgba(245,166,35,0.25)] hover:bg-[#E09018] transition-all disabled:opacity-60">
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>

                <p className="text-[11px] text-[#334155] text-center">We typically reply within a few hours during business hours.</p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-[#64748B] text-sm hover:text-[#F5A623] transition">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
