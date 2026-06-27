"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  activityItems,
  chartHeights,
  kpis,
} from "@/dashboard/components/dashboardData";
import {
  cardClass,
  contentClass,
  headerClass,
} from "@/dashboard/components/dashboardTheme";
import { cn, getKpiAccent } from "@/dashboard/components/dashboardUtils";

/* ── Animated counter ─────────────────────────────────────────── */
function AnimatedValue({ raw }) {
  const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
  const prefix = raw.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = raw.match(/[^0-9.]+$/)?.[0] ?? "";
  const isFloat = raw.includes(".");

  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (isNaN(num)) { setDisplay(raw); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 50;
        let i = 0;
        const iv = setInterval(() => {
          i++;
          const v = (num * i) / steps;
          setDisplay(isFloat ? v.toFixed(1) : Math.floor(v).toString());
          if (i >= steps) clearInterval(iv);
        }, 18);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num, raw, isFloat]);

  return <span ref={ref}>{isNaN(num) ? raw : `${prefix}${display}${suffix}`}</span>;
}

/* ── Animated bar ─────────────────────────────────────────────── */
function AnimatedBar({ height, delay, isHighlighted }) {
  const [h, setH] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => setH(height), delay);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [height, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "min-h-1 flex-1 rounded-t-[3px]",
        isHighlighted ? "bg-[var(--amber)]" : "bg-[var(--subtle)]",
      )}
      style={{
        height: `${h}%`,
        transition: `height 0.6s cubic-bezier(0.4,0,0.2,1)`,
      }}
    />
  );
}

/* ── Pulsing live dot ─────────────────────────────────────────── */
function LiveDot({ color }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10, flexShrink: 0 }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: color, opacity: 0.6,
        animation: "livePing 1.4s ease-in-out infinite",
      }} />
      <span style={{
        position: "relative", width: 8, height: 8, margin: "auto",
        borderRadius: "50%", background: color,
        boxShadow: `0 0 6px ${color}`,
      }} />
    </span>
  );
}

export default function OverviewPanel() {
  return (
    <>
      <style>{`
        @keyframes livePing {
          0%,100% { transform: scale(1); opacity: .6; }
          50%      { transform: scale(2); opacity: 0; }
        }
        @keyframes kpiIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes activityIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes novaRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.5); }
          50%      { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
        }
        @keyframes shimmerBar {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      <div className={headerClass}>
        <div>
          <div className="font-['Syne',sans-serif] text-[20px] font-extrabold tracking-[-0.5px] text-[var(--white)]">
            Overview
          </div>
          <div className="mt-[2px] text-[12px] text-[var(--muted)] max-[720px]:text-[11px]">
            Nest Driving School · Last 30 days
          </div>
        </div>
        <div className="flex items-center gap-2 max-[1080px]:w-full max-[1080px]:flex-wrap">
          <span className="inline-flex items-center gap-[6px] rounded-[4px] bg-[rgba(16,185,129,0.1)] px-[10px] py-1 font-['JetBrains_Mono',monospace] text-[10px] text-[var(--green)] max-[720px]:w-full max-[720px]:justify-center">
            <LiveDot color="#10b981" /> Nova Live
          </span>
          <Link
            href="/onboarding?view=full"
            className="inline-flex items-center justify-center rounded-[6px] bg-[var(--amber)] px-[14px] py-[6px] text-[12px] font-semibold text-[var(--bg)] transition-all duration-200 hover:bg-[var(--amber2)] hover:scale-105 max-[720px]:w-full"
          >
            Back to Onboarding
          </Link>
          <button
            type="button"
            className="cursor-pointer rounded-[6px] bg-[var(--amber)] px-[14px] py-[6px] text-[12px] font-semibold text-[var(--bg)] transition-all duration-200 hover:bg-[var(--amber2)] hover:scale-105 max-[720px]:w-full"
          >
            + New Automation
          </button>
        </div>
      </div>

      <div className={contentClass}>
        {/* ── KPI cards ───────────────────────────────────────── */}
        <div className="mb-5 grid grid-cols-4 gap-[14px] max-[1080px]:grid-cols-1 max-[720px]:gap-[10px]">
          {kpis.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "relative overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-[18px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:content-[''] transition-all duration-200 hover:border-[var(--border2)] hover:-translate-y-0.5",
                getKpiAccent(item.tone),
              )}
              style={{ animation: `kpiIn .5s ease both`, animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-2 font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
                {item.label}
              </div>
              <div className="mb-1 font-['Syne',sans-serif] text-[28px] font-extrabold tracking-[-1px]">
                <AnimatedValue raw={item.value} />
              </div>
              <div className="text-[11px] text-[var(--green)]">{item.change}</div>
            </div>
          ))}
        </div>

        {/* ── Charts row ──────────────────────────────────────── */}
        <div className="mb-[14px] grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-[14px] max-[1080px]:grid-cols-1">
          <div className={cardClass}>
            <div className="mb-4 flex items-center justify-between font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
              Leads This Month
              <span className="font-['DM_Sans',sans-serif] text-[11px] font-normal text-[var(--muted)]">
                Daily capture
              </span>
            </div>
            <div className="flex h-20 items-end gap-1">
              {chartHeights.map((height, index) => (
                <AnimatedBar
                  key={`${height}-${index}`}
                  height={height}
                  delay={index * 40}
                  isHighlighted={index >= chartHeights.length - 2}
                />
              ))}
            </div>
            {/* shimmer baseline */}
            <div style={{
              height: 1, marginTop: 6,
              background: "linear-gradient(90deg,transparent,var(--amber),transparent)",
              backgroundSize: "200% auto",
              animation: "shimmerBar 3s linear infinite",
              opacity: 0.3,
            }} />
          </div>

          <div className={cardClass}>
            <div className="mb-4 font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
              Live Activity
            </div>
            <div className="flex flex-col">
              {activityItems.map((item, index) => (
                <div
                  key={`${item.text}-${item.time}`}
                  className={cn(
                    "flex items-center gap-[10px] py-[9px] text-[12px]",
                    index !== activityItems.length - 1 && "border-b border-[var(--border)]",
                    "max-[720px]:flex-wrap max-[720px]:items-start",
                  )}
                  style={{ animation: "activityIn .4s ease both", animationDelay: `${300 + index * 90}ms` }}
                >
                  <LiveDot color={item.color} />
                  <span className="flex-1 text-[var(--text)]">{item.text}</span>
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--muted)] max-[720px]:pl-[17px]">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Nova status ─────────────────────────────────────── */}
        <div
          className="flex items-center gap-[14px] rounded-[10px] border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] px-[18px] py-4 max-[1080px]:flex-wrap max-[1080px]:items-start transition-all duration-300 hover:border-[rgba(16,185,129,0.35)] hover:bg-[rgba(16,185,129,0.1)]"
          style={{ animation: "kpiIn .5s .45s ease both" }}
        >
          <div
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[rgba(245,166,35,0.4)] bg-[linear-gradient(135deg,rgba(245,166,35,0.3),rgba(245,166,35,0.1))] text-[20px]"
            style={{ animation: "novaRing 2s ease-in-out infinite" }}
          >
            🤖
            <div className="absolute inset-[-4px] animate-pulse rounded-full border border-[rgba(16,185,129,0.4)]" />
          </div>
          <div className="flex-1">
            <div className="mb-[2px] text-[14px] font-semibold text-[var(--white)]">
              Nova is active and answering calls
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              AI receptionist · ElevenLabs voice · 24/7 coverage
            </div>
          </div>
          <div className="flex flex-wrap gap-4 max-[1080px]:w-full">
            <Stat value="189" label="Calls this month" />
            <Stat value="98%" label="Handled" />
            <Stat value="4.9★" label="Satisfaction" />
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <div className="font-['Syne',sans-serif] text-[16px] font-extrabold text-[var(--green)]">
        <AnimatedValue raw={value} />
      </div>
      <div className="text-[10px] text-[var(--muted)]">{label}</div>
    </div>
  );
}
