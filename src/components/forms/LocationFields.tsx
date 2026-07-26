import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { FormField, inputCls } from "./FormField";
import { lookupIndianPincode } from "../../lib/postal";
import { validatePincode, validateRequired, type ValidationResult } from "../../lib/validation";

export interface LocationState {
  city: string;
  pincode: string;
  district: string;
  state: string;
}

export interface LocationTouched {
  city: boolean;
  pincode: boolean;
  district: boolean;
  state: boolean;
}

export interface LocationResults {
  city: ValidationResult | null;
  pincode: ValidationResult | null;
  district: ValidationResult | null;
  state: ValidationResult | null;
}

export function validateLocation(s: LocationState): LocationResults {
  return {
    city: validateRequired(s.city, "City", 2, 80),
    pincode: validatePincode(s.pincode),
    district: validateRequired(s.district, "District", 2, 80),
    state: validateRequired(s.state, "State", 2, 80),
  };
}

export function locationValid(r: LocationResults): boolean {
  return Object.values(r).every((v) => v?.ok === true);
}

interface Props {
  state: LocationState;
  touched: LocationTouched;
  results: LocationResults;
  onChange: (field: keyof LocationState, value: string) => void;
  onBlur: (field: keyof LocationState) => void;
  onAutoFill: (data: { city: string; district: string; state: string }) => void;
}

export function LocationFields({ state, touched, results, onChange, onBlur, onAutoFill }: Props) {
  const [lookupState, setLookupState] = useState<"idle" | "loading" | "found" | "not-found">("idle");

  useEffect(() => {
    if (!/^[1-9][0-9]{5}$/.test(state.pincode)) {
      setLookupState("idle");
      return;
    }
    let alive = true;
    setLookupState("loading");
    lookupIndianPincode(state.pincode).then((data) => {
      if (!alive) return;
      if (!data) {
        setLookupState("not-found");
        return;
      }
      onAutoFill({
        city: data.city || "",
        district: data.district || "",
        state: data.state || "",
      });
      setLookupState("found");
    });
    return () => {
      alive = false;
    };
  }, [state.pincode, onAutoFill]);

  return (
    <>
      {/* City + Pincode */}
      <FormField label="City" required touched={touched.city} result={touched.city ? results.city : null}>
        <input
          type="text"
          placeholder="City"
          value={state.city}
          onChange={(e) => onChange("city", e.target.value)}
          onBlur={() => onBlur("city")}
          className={inputCls(touched.city, touched.city ? results.city : null) + " pr-9"}
        />
      </FormField>

      <FormField label="Pin Code" required touched={touched.pincode} result={touched.pincode ? results.pincode : null}>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit PIN"
            value={state.pincode}
            onChange={(e) => onChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
            onBlur={() => onBlur("pincode")}
            className={inputCls(touched.pincode, touched.pincode ? results.pincode : null) + " pr-9"}
          />
          {lookupState === "loading" && (
            <Loader2 className="absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-600" />
          )}
        </div>
        {lookupState === "found" && (
          <p className="mt-1 text-xs font-medium text-emerald-600">
            District and state auto-filled from PIN code.
          </p>
        )}
        {lookupState === "not-found" && (
          <p className="mt-1 text-xs font-medium text-amber-600">
            PIN not found. Enter district and state manually.
          </p>
        )}
      </FormField>

      {/* District + State */}
      <FormField label="District" required touched={touched.district} result={touched.district ? results.district : null}>
        <input
          type="text"
          placeholder="District"
          value={state.district}
          onChange={(e) => onChange("district", e.target.value)}
          onBlur={() => onBlur("district")}
          className={inputCls(touched.district, touched.district ? results.district : null) + " pr-9"}
        />
      </FormField>

      <FormField label="State" required touched={touched.state} result={touched.state ? results.state : null}>
        <input
          type="text"
          placeholder="State"
          value={state.state}
          onChange={(e) => onChange("state", e.target.value)}
          onBlur={() => onBlur("state")}
          className={inputCls(touched.state, touched.state ? results.state : null) + " pr-9"}
        />
      </FormField>
    </>
  );
}
