// app/privacy/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Smart SMB Hub",
  description: "How Smart SMB Hub collects, uses, and protects your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        sub: "Account Information",
        text: "When you create an account, we collect your name, email address, business name, and password. If you sign up via Google OAuth, we receive your name and email from Google.",
      },
      {
        sub: "Business Data",
        text: "To deliver our services, we collect and store data you input into the platform — including client information, leads, automation workflows, documents, and AI interaction logs.",
      },
      {
        sub: "Usage Data",
        text: "We automatically collect information about how you use the platform, including pages visited, features used, session duration, IP address, browser type, and device information.",
      },
      {
        sub: "Payment Information",
        text: "Payment processing is handled by Stripe. We do not store your full credit card number. We retain transaction records and subscription status for billing purposes.",
      },
      {
        sub: "Communications",
        text: "If you contact us via our contact form or email, we retain those messages to respond and improve our support.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "To create and manage your account and subscription",
      "To deliver and operate the Smart SMB Hub platform and its AI features",
      "To process payments and send billing-related communications",
      "To send product updates, feature announcements, and support messages",
      "To analyze usage patterns and improve platform performance",
      "To detect, prevent, and address fraud, abuse, or security issues",
      "To comply with applicable laws and legal obligations",
    ],
  },
  {
    title: "3. How We Share Your Information",
    content: [
      {
        sub: "Service Providers",
        text: "We share data with trusted third-party vendors who help us operate the platform, including: MongoDB Atlas (database), Render (backend hosting), Vercel (frontend hosting), Cloudinary (file storage), ElevenLabs (AI voice), Stripe (payments), and Resend (email). These providers are contractually required to protect your data.",
      },
      {
        sub: "AI Processing",
        text: "When you use AI features (chat, voice receptionist, document intelligence), your inputs may be processed by third-party AI models. We do not sell this data to third parties.",
      },
      {
        sub: "Legal Requirements",
        text: "We may disclose your information if required by law, court order, or governmental authority, or to protect the rights, property, or safety of Hasaan Labs LLC, our users, or the public.",
      },
      {
        sub: "Business Transfers",
        text: "If Hasaan Labs LLC is involved in a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. You will be notified via email and/or a prominent notice on our site.",
      },
      {
        sub: "No Sale of Data",
        text: "We do not sell, rent, or trade your personal information to any third party for marketing purposes.",
      },
    ],
  },
  {
    title: "4. Data Retention",
    text: "We retain your account and business data for as long as your account is active or as needed to provide services. If you cancel your account, we will delete your personal data within 90 days, except where we are required to retain it for legal or accounting purposes.",
  },
  {
    title: "5. Security",
    text: "We implement industry-standard security measures including encrypted data transmission (HTTPS/TLS), hashed passwords, JWT-based authentication, and row-level security on our database. While we take reasonable steps to protect your data, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "6. Cookies",
    text: "We use essential cookies and local storage tokens to maintain your login session. We do not use third-party advertising cookies. You can clear cookies at any time through your browser settings, which will log you out of the platform.",
  },
  {
    title: "7. Your Rights",
    items: [
      "Access: Request a copy of the personal data we hold about you",
      "Correction: Request correction of inaccurate or incomplete data",
      "Deletion: Request deletion of your personal data (subject to legal obligations)",
      "Portability: Request your data in a machine-readable format",
      "Opt-out: Unsubscribe from marketing emails at any time",
      "Complaint: Lodge a complaint with your local data protection authority",
    ],
    footer: "To exercise any of these rights, email us at hasaank192@gmail.com.",
  },
  {
    title: "8. Children's Privacy",
    text: "Smart SMB Hub is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, contact us and we will delete it promptly.",
  },
  {
    title: "9. Third-Party Links",
    text: "Our platform may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policies of any third-party services you visit.",
  },
  {
    title: "10. Changes to This Policy",
    text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our platform. Continued use of Smart SMB Hub after changes become effective constitutes your acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    text: "If you have any questions, concerns, or requests regarding this Privacy Policy, contact us at:",
    contact: {
      company: "Hasaan Labs LLC",
      location: "Washington, DC Metro Area",
      email: "hasaank192@gmail.com",
      website: "https://smartsmbhub.com",
    },
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#060911] pt-24 pb-20 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[800px]">

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-[#1A2540]">
          <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4">Legal</div>
          <h1 className="font-syne text-[clamp(32px,5vw,56px)] font-extrabold tracking-tighter text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#64748B] text-sm">
            Last updated: <strong className="text-[#94A3B8]">May 2026</strong>
          </p>
          <p className="text-[#64748B] text-[15px] mt-3 max-w-[580px]">
            At Hasaan Labs LLC ("we", "us", "our"), we take your privacy seriously.
            This policy explains what data Smart SMB Hub collects, how we use it,
            and your rights regarding that data.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-4">
              <h2 className="font-syne text-[18px] font-bold text-white">{section.title}</h2>

              {section.text && (
                <p className="text-[#94A3B8] text-[14px] leading-relaxed">{section.text}</p>
              )}

              {section.content && section.content.map((block, j) => (
                <div key={j} className="bg-[#0C1220] border border-[#1A2540] rounded-xl p-5">
                  <div className="text-[#F5A623] font-medium text-[13px] mb-1">{block.sub}</div>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">{block.text}</p>
                </div>
              ))}

              {section.items && (
                <ul className="flex flex-col gap-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-[14px] text-[#94A3B8]">
                      <span className="text-[#10B981] mt-px flex-shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="text-[#64748B] text-[13px] mt-1">{section.footer}</p>
              )}

              {section.contact && (
                <div className="bg-[#0C1220] border border-[#1A2540] rounded-xl p-5 flex flex-col gap-1 text-[13px]">
                  <div className="text-white font-semibold">{section.contact.company}</div>
                  <div className="text-[#64748B]">{section.contact.location}</div>
                  <a href={`mailto:${section.contact.email}`} className="text-[#F5A623] hover:underline">{section.contact.email}</a>
                  <a href={section.contact.website} className="text-[#64748B] hover:text-[#F5A623] transition">{section.contact.website}</a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#1A2540] flex flex-wrap gap-4 items-center justify-between">
          <Link href="/" className="text-[#64748B] text-sm hover:text-[#F5A623] transition">← Back to home</Link>
          <Link href="/terms" className="text-[#64748B] text-sm hover:text-[#F5A623] transition">Terms of Service →</Link>
        </div>
      </div>
    </div>
  );
}
