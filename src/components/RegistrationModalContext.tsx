import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type RegistrationType = "exhibitor" | "visitor" | "chooser" | "contact" | "partner" | "booth" | "sponsor";

export type BoothInterest = {
  boothId: string;
  category?: string;
  width?: string;
  length?: string;
  totalArea?: string;
  rate?: string;
  totalAmount?: string;
};

interface RegistrationModalContextValue {
  type: RegistrationType | null;
  open: (type: RegistrationType, booth?: BoothInterest) => void;
  booth?: BoothInterest;
  close: () => void;
}

const RegistrationModalContext = createContext<RegistrationModalContextValue | null>(null);

export function RegistrationModalProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<RegistrationType | null>(null);
  const [booth, setBooth] = useState<BoothInterest | undefined>();
  const value = useMemo(
    () => ({
      type,
      booth,
      open: (next: RegistrationType, nextBooth?: BoothInterest) => {
        setBooth(nextBooth);
        setType(next);
      },
      close: () => { setBooth(undefined); setType(null); },
    }),
    [type, booth]
  );
  return (
    <RegistrationModalContext.Provider value={value}>
      {children}
    </RegistrationModalContext.Provider>
  );
}

export function useRegistrationModal() {
  const ctx = useContext(RegistrationModalContext);
  if (!ctx) {
    return { type: null, booth: undefined, open: () => undefined, close: () => undefined };
  }
  return ctx;
}