/**
 * India Post public API helpers.
 * No API key is required. Used only to auto-fill city/district/state
 * dynamically from a 6-digit PIN code.
 */
export interface PostalLookup {
  city: string;
  district: string;
  state: string;
  postOffices: string[];
}

export async function lookupIndianPincode(pin: string): Promise<PostalLookup | null> {
  if (!/^[1-9][0-9]{5}$/.test(pin)) return null;
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    if (!res.ok) return null;
    const data = await res.json();
    const record = Array.isArray(data) ? data[0] : null;
    const offices = record?.PostOffice;
    if (record?.Status !== "Success" || !Array.isArray(offices) || offices.length === 0) {
      return null;
    }
    const first = offices[0];
    return {
      city: first.Name || first.Block || "",
      district: first.District || "",
      state: first.State || "",
      postOffices: offices
        .map((o: { Name?: string }) => o.Name)
        .filter((name: string | undefined): name is string => Boolean(name)),
    };
  } catch {
    return null;
  }
}