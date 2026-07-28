import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import User from "@/models/User";
import UserDashboard from "@/models/UserDashboard";
import {
  automationsSeed,
  dashboardNav,
  businessNav,
  accountNav,
  settingsTabs,
} from "@/dashboard/components/dashboardData";

function buildSettingsTabs() {
  const fallbackIds = ["profile", "notifications", "integrations", "ai-model", "team"];
  return settingsTabs.map((tab, index) => {
    const [icon = "", ...labelParts] = String(tab).split(" ");
    return {
      id: fallbackIds[index] ?? `tab-${index + 1}`,
      icon,
      label: labelParts.join(" ") || String(tab),
    };
  });
}

function mergeAutomations(savedStates) {
  if (!savedStates?.length) return automationsSeed;

  const stateMap = new Map(savedStates.map((a) => [a.id, a.enabled]));
  return automationsSeed.map((automation) =>
    stateMap.has(automation.id)
      ? { ...automation, enabled: stateMap.get(automation.id) }
      : automation,
  );
}

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();

    const [dbUser, dashboard] = await Promise.all([
      User.findById(user.userId).lean(),
      UserDashboard.findOne({ userId: user.userId }).lean(),
    ]);

    const tabItems = buildSettingsTabs();

    if (!dashboard) {
      return NextResponse.json({
        data: {
          profile: { displayName: dbUser?.username ?? "" },
          navigation: { dashboardNav, businessNav, accountNav },
          settings: { tabs: tabItems },
          preferences: {
            activePanel: "overview",
            activeDocument: "policy",
            activeSettingsTabId: "profile",
            selectedPlanId: "pro",
            billingCycle: "monthly",
            businessProfile: { businessName: "", businessType: "", website: "" },
            settingsToggles: { claude: true, streaming: true, history: true },
            billingProfile: {},
            automations: automationsSeed,
          },
        },
      });
    }

    return NextResponse.json({
      data: {
        profile: { displayName: dbUser?.username ?? "" },
        navigation: { dashboardNav, businessNav, accountNav },
        settings: { tabs: tabItems },
        preferences: {
          activePanel: dashboard.activePanel,
          activeDocument: dashboard.activeDocument,
          activeSettingsTabId: dashboard.activeSettingsTabId,
          selectedPlanId: dashboard.selectedPlanId,
          billingCycle: dashboard.billingCycle,
          businessProfile: dashboard.businessProfile,
          settingsToggles: dashboard.settingsToggles,
          billingProfile: dashboard.billingProfile,
          automations: mergeAutomations(dashboard.automations),
        },
      },
    });
  } catch (error) {
    console.error("GET /userdashboard/bootstrap error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
