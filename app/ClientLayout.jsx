"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AuthModal from "@/auth/login/AuthModal";

export default function ClientLayout({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login");

  useEffect(() => {
    const handleOpen = (e) => {
      setModalTab(e.detail?.tab || "login");
      setModalOpen(true);
    };
    window.addEventListener("open-auth-modal", handleOpen);
    return () => window.removeEventListener("open-auth-modal", handleOpen);
  }, []);

  const openModal = (tab = "login") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <>
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111927",
            color: "#E2E8F0",
            border: "1px solid #1A2540",
          },
        }}
      />
      <Navbar openModal={openModal} />
      <main>{children}</main>
      <Footer />
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}