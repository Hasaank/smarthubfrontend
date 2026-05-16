"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setStoredAuthSession } from "@/authservice/AuthService";
import { Suspense } from "react";

function GoogleSuccessHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const userRaw = params.get("user");

    if (!token || !userRaw) {
      router.replace("/");
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userRaw));
      setStoredAuthSession({ token, user });

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth-state-changed"));
      }

      router.replace("/onboarding");
    } catch {
      router.replace("/");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen bg-[#060911] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#64748B] text-sm">Signing you in with Google...</p>
      </div>
    </div>
  );
}

export default function GoogleSuccessPage() {
  return (
    <Suspense>
      <GoogleSuccessHandler />
    </Suspense>
  );
}
