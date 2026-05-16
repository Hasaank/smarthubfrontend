// components/AgencyPitch.jsx
"use client";

const rows = [
  { label: "Setup Cost",       agency: "$1,000+ one-time",    smb: "Free to start",       win: true  },
  { label: "Monthly Retainer", agency: "$500 – $800/mo",      smb: "$97 – $197/mo",       win: true  },
  { label: "Setup Time",       agency: "2 – 4 weeks",         smb: "Under 1 hour",        win: true  },
  { label: "Contract",         agency: "6 – 12 months",       smb: "Cancel anytime",      win: true  },
  { label: "AI Receptionist",  agency: "Rarely included",     smb: "Built-in on Pro",     win: true  },
  { label: "Customization",    agency: "Manual & slow",       smb: "Pre-built per industry", win: true },
  { label: "24/7 Coverage",    agency: "Extra cost",          smb: "Included",            win: true  },
];

export default function AgencyPitch() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-6 md:px-12">
      <div className="bg-[#0C1220] border border-[#243050] rounded-2xl overflow-hidden shadow-xl">

        {/* Header */}
        <div className="px-8 pt-10 pb-6 md:px-12">
          <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4">
            Why Smart SMB Hub
          </div>
          <h2 className="font-syne text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tighter text-white mb-3">
            Same AI. A fraction<br />
            <em className="text-[#F5A623] not-italic">of the agency price.</em>
          </h2>
          <p className="text-[#64748B] text-base max-w-[480px]">
            Local agencies charge thousands to set up what Smart SMB Hub does in under an hour — for less than your phone bill.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-t border-b border-[#1A2540]">
                <th className="text-left px-8 md:px-12 py-4 font-mono-custom text-[10px] text-[#64748B] uppercase tracking-wider font-normal w-[35%]">
                  What You Get
                </th>
                <th className="text-center px-6 py-4 font-mono-custom text-[10px] text-[#64748B] uppercase tracking-wider font-normal w-[30%]">
                  Local Agency
                </th>
                <th className="text-center px-6 py-4 font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-wider font-normal w-[30%]">
                  Smart SMB Hub
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-[#1A2540] transition-colors hover:bg-[#111927] ${
                    i === rows.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-8 md:px-12 py-4 text-[#94A3B8] font-medium text-[13px]">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[#64748B] text-[13px]">
                      <span className="text-[#EF4444] text-base">✗</span>
                      {row.agency}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: "#10B981" }}>
                      <span className="text-base">✓</span>
                      {row.smb}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="px-8 md:px-12 py-8 bg-[#111927] border-t border-[#1A2540] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-syne text-white font-bold text-[16px]">Ready to ditch the agency?</div>
            <div className="text-[#64748B] text-sm mt-1">Start free for 14 days. No card. No contract. No agency.</div>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-auth-modal", { detail: { tab: "signup" } }))}
            className="whitespace-nowrap rounded-lg bg-[#F5A623] px-6 py-3 font-syne text-sm font-bold text-[#060911] shadow-[0_0_30px_rgba(245,166,35,0.25)] hover:bg-[#E09018] transition-all"
          >
            Start Free Trial →
          </button>
        </div>
      </div>
    </section>
  );
}
