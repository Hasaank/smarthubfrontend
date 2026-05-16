export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 99,
    setupFee: 99,
    featured: false,
    description: "For solo operators ready to automate their first workflows.",
    ctaLabel: "Get Started",
    setupLabel: "One-time setup fee",
    features: [
      "AI Chat Assistant",
      "3 workflow automations",
      "50,000 AI tokens/month",
      "1 user account",
      "Email support",
      "Onboarding call included",
      { text: "Voice receptionist", muted: true },
      { text: "Document intelligence", muted: true },
    ],
    capabilities: {
      claude: false,
      receptionist: false,
      documentIntelligence: false,
      teamSeats: 1,
      automations: 3,
    },
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 199,
    setupFee: 199,
    featured: true,
    description: "For growing businesses that want full AI automation and voice.",
    ctaLabel: "Start Pro",
    setupLabel: "Plus one-time setup fee",
    features: [
      "Everything in Starter",
      "AI Voice Receptionist",
      "Document Intelligence (RAG)",
      "5 workflow automations",
      "200,000 AI tokens/month",
      "3 user accounts",
      "Priority support",
      "Custom AI persona",
    ],
    capabilities: {
      claude: true,
      receptionist: true,
      documentIntelligence: true,
      teamSeats: 3,
      automations: 5,
    },
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: null,
    setupFee: null,
    featured: false,
    description: "For multi-location teams that need scale, white-labeling, and full support.",
    ctaLabel: "Let's Talk",
    setupLabel: "Custom pricing",
    features: [
      "Everything in Pro",
      "White-label branding",
      "Custom subdomain",
      "Unlimited automations",
      "Unlimited tokens",
      "Unlimited team members",
      "Dedicated onboarding call",
      "SLA & priority escalation",
    ],
    capabilities: {
      claude: true,
      receptionist: true,
      documentIntelligence: true,
      teamSeats: null,
      automations: null,
    },
  },
];

export function getPlanById(planId) {
  return pricingPlans.find((plan) => plan.id === planId) ?? pricingPlans[0];
}

export function getPlanPrice(plan) {
  if (!plan.monthlyPrice) return null;
  return plan.monthlyPrice;
}

export function getPlanPeriod() {
  return "per month";
}

export function getPlanYearlyTotal(plan) {
  if (!plan.monthlyPrice) return null;
  return Math.round(plan.monthlyPrice * 0.8) * 12;
}

export const billingCycles = {
  monthly: {
    id: "monthly",
    label: "Monthly",
    period: "per month, billed monthly",
    discountLabel: null,
    multiplier: 1,
  },
  yearly: {
    id: "yearly",
    label: "Yearly",
    period: "per month, billed annually",
    discountLabel: "Save 20%",
    multiplier: 0.8,
  },
};
