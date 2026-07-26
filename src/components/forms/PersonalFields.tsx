/**
 * PersonalFields — reusable block of validated personal-info inputs.
 * Used by both ContactForm, ExhibitorForm and VisitorForm.
 */
import { FormField, PhoneInput, inputCls } from "./FormField";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateDOB,
  type ValidationResult,
} from "../../lib/validation";

const GENDERS = [
  "Male",
  "Female",
  "Transgender",
  "Prefer not to say",
];

export interface PersonalState {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
}

export interface PersonalTouched {
  fullName: boolean;
  email: boolean;
  phone: boolean;
  gender: boolean;
  dob: boolean;
}

export interface PersonalResults {
  fullName: ValidationResult | null;
  email: ValidationResult | null;
  phone: ValidationResult | null;
  gender: ValidationResult | null;
  dob: ValidationResult | null;
}

export function validatePersonal(s: PersonalState): PersonalResults {
  return {
    fullName: validateName(s.fullName),
    email: validateEmail(s.email),
    phone: validatePhone(s.phone),
    gender: s.gender ? { ok: true, msg: "" } : { ok: false, msg: "Please select a gender." },
    dob: validateDOB(s.dob),
  };
}

export function personalValid(r: PersonalResults): boolean {
  return Object.values(r).every((v) => v?.ok === true);
}

interface Props {
  state: PersonalState;
  touched: PersonalTouched;
  results: PersonalResults;
  onChange: (field: keyof PersonalState, value: string) => void;
  onBlur: (field: keyof PersonalState) => void;
}

export function PersonalFields({ state, touched, results, onChange, onBlur }: Props) {
  return (
    <>
      {/* Full Name */}
      <div className="sm:col-span-2">
        <FormField label="Full Name" required touched={touched.fullName} result={results.fullName}>
          <input
            type="text"
            placeholder="First and last name"
            value={state.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            onBlur={() => onBlur("fullName")}
            className={inputCls(touched.fullName, results.fullName) + " pr-9"}
          />
        </FormField>
      </div>

      {/* Email */}
      <FormField label="Email" required touched={touched.email} result={results.email}>
        <input
          type="email"
          placeholder="you@company.com"
          value={state.email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => onBlur("email")}
          className={inputCls(touched.email, results.email) + " pr-9"}
        />
      </FormField>

      {/* Phone */}
      <FormField label="Mobile Number" required touched={touched.phone} result={results.phone}>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none text-sm font-medium text-slate-400">
            +91
          </span>
          <PhoneInput
            value={state.phone}
            onChange={(v) => onChange("phone", v)}
            onBlur={() => onBlur("phone")}
            className={
              inputCls(touched.phone, results.phone) +
              " pl-12 pr-9"
            }
          />
          {/* shown inline via FormField's icon */}
        </div>
      </FormField>

      {/* Gender */}
      <FormField label="Gender" required touched={touched.gender} result={results.gender}>
        <select
          value={state.gender}
          onChange={(e) => onChange("gender", e.target.value)}
          onBlur={() => onBlur("gender")}
          className={inputCls(touched.gender, results.gender)}
        >
          <option value="" disabled>Select gender</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </FormField>

      {/* Date of Birth — 18+ validation */}
      <FormField
        label="Date of Birth (18+ required)"
        required
        touched={touched.dob}
        result={results.dob}
      >
        <input
          type="date"
          max={(() => {
            const d = new Date();
            d.setFullYear(d.getFullYear() - 18);
            return d.toISOString().split("T")[0];
          })()}
          value={state.dob}
          onChange={(e) => onChange("dob", e.target.value)}
          onBlur={() => onBlur("dob")}
          className={inputCls(touched.dob, results.dob) + " pr-9"}
        />
      </FormField>
    </>
  );
}
