import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RegistrationModalProvider } from "./RegistrationModalContext";
import { RegistrationModal } from "./RegistrationModal";
import { WhatsAppChat } from "./WhatsAppChat";
import { SeoHead } from "./SeoHead";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <RegistrationModalProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <SeoHead />
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <RegistrationModal />
        <WhatsAppChat />
      </div>
    </RegistrationModalProvider>
  );
}
