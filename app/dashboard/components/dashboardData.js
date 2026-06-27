export const dashboardNav = [
  { id: "overview", icon: "📊", label: "Overview" },
  { id: "chat", icon: "💬", label: "AI Chat", badge: "3" },
  { id: "nova", icon: "🤖", label: "Nova Receptionist", badge: "Live", badgeGreen: true },
  { id: "automations", icon: "⚡", label: "Automations" },
  { id: "docs", icon: "📄", label: "Documents" },
];

export const businessNav = [
  { id: "leads", icon: "👥", label: "Leads & CRM" },
  { id: "appointments", icon: "📆", label: "Appointments" },
  { id: "reviews", icon: "⭐", label: "Reviews" },
];

export const accountNav = [
  { id: "settings", icon: "⚙️", label: "Settings" },
  { id: "billing", icon: "💳", label: "Billing" },
];

export const kpis = [
  { tone: "a", label: "Leads Captured", value: "0", change: "Connect Nova to start capturing" },
  { tone: "g", label: "Calls Handled by Nova", value: "0", change: "Activate Nova to see live calls" },
  { tone: "c", label: "Avg Response Time", value: "—", change: "Will update once Nova is live" },
  { tone: "p", label: "Time Saved (hrs)", value: "0h", change: "Enable automations to track" },
];

export const chartHeights = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const activityItems = [
  { color: "var(--muted)", text: "No activity yet — activate Nova to see live events here", time: "" },
];

export const conversations = [
  { id: "getting-started", title: "How to get the most out of SmartSMB", time: "Just now" },
  { id: "nova-setup", title: "Setting up Nova for your business", time: "Suggested" },
  { id: "automations-intro", title: "Which automations should I enable first?", time: "Suggested" },
  { id: "leads-strategy", title: "Lead capture best practices", time: "Suggested" },
];

export const conversationThreads = {
  "getting-started": {
    title: "How to get the most out of SmartSMB",
    model: "claude-sonnet-4-6",
    messages: [
      {
        role: "assistant",
        time: "Now",
        content:
          "Welcome to SmartSMB! Here's what to do first:\n\n1. **Activate Nova** — your AI receptionist that answers calls 24/7 and captures leads automatically.\n\n2. **Enable Automations** — turn on lead capture → CRM, appointment reminders, and review requests.\n\n3. **Upload Documents** — add your pricing, policies, and service info so Nova can answer customer questions accurately.\n\n4. **Set up your profile** — add your business details in Settings so everything is personalized.\n\nAsk me anything about your business and I'll help you grow it.",
      },
    ],
  },
  "nova-setup": {
    title: "Setting up Nova for your business",
    model: "claude-sonnet-4-6",
    messages: [
      {
        role: "assistant",
        time: "Now",
        content:
          "Nova is your AI receptionist. To get it live:\n\n1. Go to **Nova** in the sidebar\n2. Add your business phone number and forward calls to Nova's number\n3. Upload your FAQ document so Nova knows how to answer common questions\n4. Set your hours so Nova knows when to route calls vs. handle them\n\nOnce active, Nova will answer every call, capture leads, and trigger your follow-up automations automatically.",
      },
    ],
  },
  "automations-intro": {
    title: "Which automations should I enable first?",
    model: "claude-sonnet-4-6",
    messages: [
      {
        role: "assistant",
        time: "Now",
        content:
          "Start with these three — they have the highest ROI for most small businesses:\n\n1. **Lead Capture → CRM** — automatically saves every Nova lead to your pipeline. Zero missed opportunities.\n\n2. **Appointment Reminder** — sends SMS 24 hours before any booking. Reduces no-shows by 12–18%.\n\n3. **Review Request** — sends a Google review link 2 hours after a completed appointment. Most businesses get 4–6× more reviews within the first month.\n\nYou can enable all three in the Automations tab right now.",
      },
    ],
  },
  "leads-strategy": {
    title: "Lead capture best practices",
    model: "claude-sonnet-4-6",
    messages: [
      {
        role: "assistant",
        time: "Now",
        content:
          "The fastest way to increase lead capture:\n\n1. **Speed to lead** — responding within 5 minutes increases conversion by 9×. Nova handles this automatically.\n\n2. **Multi-channel capture** — make sure Nova's number is on your website, Google Business Profile, and social bio.\n\n3. **Follow-up sequence** — leads that don't book immediately get a 3-message nurture sequence over 2 weeks.\n\n4. **Qualify fast** — Nova asks qualifying questions on every call so you only spend time on serious prospects.",
      },
    ],
  },
};

export const automationsSeed = [
  {
    id: "lead-capture",
    triggerClass: "at-webhook",
    trigger: "⚡ Webhook Trigger",
    name: "Lead Capture → CRM",
    desc: "When Nova captures a lead via phone call, automatically create a contact in your CRM and assign to follow-up pipeline.",
    stats: [
      { value: "0", label: "Runs", className: "green" },
      { value: "—", label: "Success", className: "amber" },
      { value: "—", label: "Avg Time", style: { color: "var(--cyan)" } },
    ],
    enabled: true,
  },
  {
    id: "appointment-reminder",
    triggerClass: "at-schedule",
    trigger: "🕐 Scheduled",
    name: "Appointment Reminder",
    desc: "Send SMS reminder 24 hours before a scheduled appointment. Include service details and location.",
    stats: [
      { value: "0", label: "Sent", className: "green" },
      { value: "—", label: "No-show reduction", className: "amber" },
    ],
    enabled: true,
  },
  {
    id: "review-request",
    triggerClass: "at-event",
    trigger: "📍 Post-Event",
    name: "Review Request",
    desc: "2 hours after a job or appointment is marked complete, send a personalized SMS asking for a Google review with a direct link.",
    stats: [
      { value: "0", label: "Reviews", className: "green" },
      { value: "—", label: "Avg Rating", className: "amber" },
    ],
    enabled: true,
  },
  {
    id: "cold-lead",
    triggerClass: "at-schedule",
    trigger: "🔁 7-Day Re-engage",
    name: "Cold Lead Nurture",
    desc: "If a lead hasn't booked after 7 days, send a sequence of 3 personalized follow-up messages over 2 weeks.",
    stats: [
      { value: "Paused", label: "Status", style: { color: "var(--muted)" } },
      { value: "—", label: "Re-engage rate", className: "amber" },
    ],
    enabled: false,
  },
];

export const documents = [
  {
    id: "policy",
    icon: "📋",
    name: "Business Policy & FAQ",
    meta: "Upload your policy or FAQ document",
    badge: "Not uploaded",
    badgeClass: "db-processing",
  },
  {
    id: "contract",
    icon: "📝",
    name: "Service Agreement Template",
    meta: "Upload your contract or service agreement",
    badge: "Not uploaded",
    badgeClass: "db-processing",
  },
  {
    id: "pricing",
    icon: "💰",
    name: "Pricing & Packages",
    meta: "Upload your pricing sheet",
    badge: "Not uploaded",
    badgeClass: "db-processing",
  },
  {
    id: "routes",
    icon: "📁",
    name: "Additional Documents",
    meta: "Any other files Nova should know about",
    badge: "Not uploaded",
    badgeClass: "db-processing",
  },
];

export const settingsTabs = [
  "👤 Profile",
  "🔔 Notifications",
  "🔌 Integrations",
  "🤖 AI Model",
  "👥 Team",
];

export const recentCalls = [
  {
    color: "var(--muted)",
    text: "No calls yet — Nova will log every inbound call here once activated",
    time: "",
  },
];

export const leadPipeline = [
  {
    id: "new-inquiry",
    title: "New Inquiries",
    count: 0,
    value: "$0",
    leads: [],
  },
  {
    id: "qualified",
    title: "Qualified",
    count: 0,
    value: "$0",
    leads: [],
  },
  {
    id: "booked",
    title: "Booked",
    count: 0,
    value: "$0",
    leads: [],
  },
];

export const crmMetrics = [
  { label: "Open Leads", value: "0", tone: "amber", detail: "Nova will populate this" },
  { label: "Qualified Rate", value: "—", tone: "green", detail: "Tracked after first leads" },
  { label: "Pipeline Value", value: "$0", tone: "cyan", detail: "Updated as leads convert" },
  { label: "Avg Response", value: "—", tone: "purple", detail: "Nova + team follow-up" },
];

export const leadActivities = [
  { color: "var(--muted)", text: "No lead activity yet — activate Nova to start capturing leads automatically", time: "" },
];

export const appointmentMetrics = [
  { label: "Today's Bookings", value: "0", tone: "amber", detail: "Connect your calendar" },
  { label: "Confirmed Rate", value: "—", tone: "green", detail: "After reminders are live" },
  { label: "Reschedules", value: "0", tone: "cyan", detail: "Handled automatically" },
  { label: "This Week", value: "0", tone: "purple", detail: "Total appointments" },
];

export const todaysAppointments = [];

export const instructorSchedule = [];

export const appointmentAlerts = [
  {
    title: "Connect your calendar",
    body: "Link your Google Calendar or booking system in Settings → Integrations so SmartSMB can manage appointments automatically.",
    tone: "amber",
  },
  {
    title: "Enable appointment reminders",
    body: "Turn on the Appointment Reminder automation to automatically reduce no-shows with SMS and voice reminders.",
    tone: "cyan",
  },
];
