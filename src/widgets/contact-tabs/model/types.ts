export type TabKey = "address" | "phone" | "social";

export const PHONE_E164 = "+380671496741";

export type TabDefinition = {
  id: TabKey;
  labelKey: "tabAddress" | "tabPhone" | "tabSocial";
};

export const CONTACT_TAB_DEFS: TabDefinition[] = [
  { id: "address", labelKey: "tabAddress" },
  { id: "phone", labelKey: "tabPhone" },
  { id: "social", labelKey: "tabSocial" },
];
