"use client";

import { useEffect, useState } from "react";
import { AdminCard, AdminPanel, SectionForm } from "@/components/admin/AdminUi";
import { api } from "@/lib/api";
import type { SiteSettings } from "@/lib/cms-types";

export default function AdminSitePage() {
  const [values, setValues] = useState<SiteSettings>({
    name: "",
    tagline: "",
    phone: "",
    phoneAlt: "",
    email: "",
    address: "",
    logoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.admin.getSite().then((data) => data && setValues(data)).catch(console.error);
  }, []);

  async function save() {
    setLoading(true);
    try {
      await api.admin.updateSite(values);
      setMessage("Site settings saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminPanel title="Site Settings" description="Global contact details, branding, and logo path.">
      <AdminCard>
        <SectionForm
          fields={[
            { name: "name", label: "Resort name" },
            { name: "tagline", label: "Tagline" },
            { name: "phone", label: "Phone" },
            { name: "phoneAlt", label: "Alternate phone" },
            { name: "email", label: "Email" },
            { name: "address", label: "Address" },
            { name: "logoUrl", label: "Logo path", placeholder: "/logo.png" },
          ]}
          values={values}
          onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))}
          onSubmit={save}
          loading={loading}
        />
        {message ? <p className="mt-4 text-sm text-brown">{message}</p> : null}
      </AdminCard>
    </AdminPanel>
  );
}
