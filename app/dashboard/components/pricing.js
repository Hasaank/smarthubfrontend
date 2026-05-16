export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 97,
    featured: false,
    description: "For solo operators ready to automate their first workflows.",
    ctaLabel: "Start Free Trial",
    trialDays: 14,
    features: [
      "AI Chat Assistant",
      "2 workflow automations",
      "Lead capture & logging",
      "50,000 AI tokens/month",
      "1 user account",
      "Email support",
      { text: "AI Voice Receptionist", muted: true },
      { text: "Document Intelligence", muted: true },
    ],
    capabilities: {
      claude: false,
      receptionist: false,
      documentIntelligence: false,
      teamSeats: 1,
      automations: 2,
    },
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 197,
    featured: true,
    description: "For growing businesses that want the full AI stack.",
    ctaLabel: "Start Free Trial",
    trialDays: 14,
    features: [
      "Everything in Starter",
      "AI Voice Receptionist",
      "Document Intelligence (RAG)",
      "5 workflow automations",
      "200,000 AI tokens/month",
      "3 user accounts",
      "Custom AI persona name & voice",
      "Priority support",
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
    monthlyPrice: 497,
    featured: false,
    description: "For multi-location teams that need scale and white-labeling.",
    ctaLabel: "Let's Talk",
    trialDays: 0,
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
