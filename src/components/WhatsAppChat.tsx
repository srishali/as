import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT } from "../config/site.config";

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-open the popup 4 seconds after the site loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Handle auto-close (10s timer) + click/touch outside when popup is open
  useEffect(() => {
    if (!isOpen) return;
    setShowTooltip(false);

    // 1. Auto close after 10s of inactivity
    const autoCloseTimer = setTimeout(() => {
      setIsOpen(false);
      setShowTooltip(true); // show a gentle reminder tooltip after auto-close
    }, 10000);

    // 2. Close on click/touch outside
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      clearTimeout(autoCloseTimer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const whatsappNumber = EVENT.whatsapp.replace(/\+/g, "");
  const message = encodeURIComponent(
    "Hi! I'm interested in the Bengaluru Auto Expo 2026. Can you help me?"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-80"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#075E54] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <WhatsAppLogo className="h-6 w-6 fill-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#075E54] bg-[#25D366]"></span>
                </div>
                <div>
                  <p className="text-sm font-bold">Auto Expo Support</p>
                  <p className="text-[10px] opacity-80">
                    Typically replies in 1 hour
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="relative h-32 bg-[#E5DDD5] p-4">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                }}
              ></div>
              <div className="relative z-10 max-w-[85%] rounded-lg bg-white p-3 text-xs text-slate-800 shadow-sm">
                <p>Hello! 👋</p>
                <p className="mt-1">
                  How can we help you regarding the Auto Expo 2026 today?
                </p>
                <span className="mt-1 block text-right text-[9px] opacity-40">
                  10:00 AM
                </span>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="bg-white p-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Start Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg ring-1 ring-black/5"
            >
              Need help? Chat with us!
              <div className="absolute right-4 top-full h-2 w-2 -translate-y-1 rotate-45 bg-white ring-b ring-1 ring-black/5"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <WhatsAppLogo className="h-8 w-8 fill-white" />
          )}
        </button>
      </div>
    </div>
  );
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.187-1.622c1.736.946 3.702 1.445 5.703 1.445h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
