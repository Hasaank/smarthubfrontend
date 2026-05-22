import { NextResponse } from "next/server";

const businessOptions = [
  {
    id: "driving-school",
    icon: "🚗",
    name: "Driving School",
    desc: "Lesson bookings, road test prep, student follow-ups",
    toolkit: "4 workflows, 12 AI prompts, and phone integrations pre-configured",
  },
  {
    id: "medical",
    icon: "🏥",
    name: "Dental / Medical",
    desc: "Appointment reminders, patient re-engagement, reviews",
    toolkit: "5 workflows, patient recall prompts, and booking integrations pre-configured",
  },
  {
    id: "wellness",
    icon: "💆",
    name: "Med Spa / Wellness",
    desc: "Treatment bookings, upsell campaigns, no-show recovery",
    toolkit: "4 workflows, treatment upsell prompts, and CRM integrations pre-configured",
  },
  {
    id: "salon",
    icon: "💇",
    name: "Salon / Hair Studio",
    desc: "Appointment bookings, seasonal campaigns, review requests",
    toolkit: "3 workflows, seasonal campaign prompts, and booking integrations pre-configured",
  },
  {
    id: "real-estate",
    icon: "🏠",
    name: "Real Estate",
    desc: "Lead nurture, listing summaries, document Q&A",
    toolkit: "6 workflows, listing summary prompts, and lead nurture integrations pre-configured",
  },
  {
    id: "restaurant",
    icon: "🍽️",
    name: "Restaurant / Catering",
    desc: "Reservation management, event bookings, review automation",
    toolkit: "4 workflows, reservation automation, and review prompts pre-configured",
  },
];

const integrationsSeed = [
  {
    id: "phone",
    icon: "📞",
    name: "Phone Number",
    desc: "Route inbound calls to Nova AI receptionist",
    connected: true,
    initialStatus: "Connected",
  },
  {
    id: "calendar",
    icon: "📅",
    name: "Google Calendar",
    desc: "Sync lesson bookings and appointments automatically",
    connected: false,
    initialStatus: "Connect",
  },
  {
    id: "crm",
    icon: "💼",
    name: "GoHighLevel / CRM",
    desc: "Pipe captured leads directly into your CRM pipeline",
    connected: false,
    initialStatus: "Connect",
  },
  {
    id: "email",
    icon: "✉️",
    name: "Gmail / Email",
    desc: "Send automated follow-ups and booking confirmations",
    connected: false,
    initialStatus: "Skip for now",
  },
  {
    id: "sms",
    icon: "💬",
    name: "SMS / Twilio",
    desc: "Text-based lead follow-up and appointment reminders",
    connected: false,
    initialStatus: "Skip for now",
  },
];

const voiceSettingsSeed = [
  { id: "style", label: "Voice Style", value: "Friendly and Professional", selected: true },
  { id: "language", label: "Language", value: "English (US)", selected: false },
  { id: "hours", label: "Hours", value: "24/7 Always On", selected: false },
  { id: "greeting", label: "Greeting", value: "Custom Business Intro", selected: false },
];

const progressSteps = [
  { step: 1, label: "Account Created" },
  { step: 2, label: "Business Type" },
  { step: 3, label: "Integrations" },
  { step: 4, label: "Configure Nova" },
  { step: 5, label: "Go Live" },
];

const liveCards = [
  {
    id: "nova-active",
    icon: "🤖",
    title: "Nova Active",
    description: "AI receptionist is live",
    tone: "success",
  },
  {
    id: "workflows-on",
    icon: "⚡",
    title: "4 Workflows On",
    description: "Automations running",
    tone: "warning",
  },
  {
    id: "dashboard-ready",
    icon: "📊",
    title: "Dashboard Ready",
    description: "Live metrics tracking",
    tone: "info",
  },
];

const copy = {
  businessTitle: "What type of business do you run?",
  businessSubtitle:
    "We'll pre-load the perfect tools, workflows, and AI prompts for your industry.",
  integrationsTitle: "Connect your existing tools",
  integrationsSubtitle: "Link the tools you already use. You can always add more later.",
  novaTitle: "Meet Nova - your AI receptionist",
  novaSubtitle: "Customize how Nova sounds and what she knows about your business.",
  novaReadyTitle: "Nova is ready",
  novaReadySubtitle:
    "Powered by ElevenLabs voice AI - Pre-trained on your business type",
  liveTitle: "You're live!",
  liveSubtitle:
    "Nova is answering your calls. Automations are running. Your dashboard is live. Welcome to Smart SMB Hub.",
};

const defaults = {
  currentStep: 2,
  selectedBusinessId: "driving-school",
  businessName: "Nest Driving School",
  greeting: "Thanks for calling Nest Driving School. How can I help you today?",
};

export async function GET() {
  return NextResponse.json({
    data: {
      defaults,
      businessOptions,
      integrationsSeed,
      voiceSettingsSeed,
      progressSteps,
      liveCards,
      copy,
    },
  });
}
