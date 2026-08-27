"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminPanel, SectionForm } from "@/components/admin/AdminUi";
import { api } from "@/lib/api";
import type { SiteSettings } from "@/lib/cms-types";
import { estimateDataUrlBytes, formatBytes } from "@/lib/image-upload";

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

  useEffect(() => {
    api.admin
      .getSite()
      .then((data) => data && setValues(data))
      .catch((err) =>
        toast.error(err instanceof Error ? err.message : "Failed to load site settings"),
      );
  }, []);

  async function save() {
    setLoading(true);
    try {
      const logo = values.logoUrl ?? "";
      if (logo.startsWith("data:image/")) {
        const size = estimateDataUrlBytes(logo);
        if (size > 1.5 * 1024 * 1024) {
          toast.error(
            `Logo is still too large (${formatBytes(size)}). Please choose a smaller image under 2 MB.`,
          );
          return;
        }
      }
      await api.admin.updateSite(values);
      toast.success("Site settings updated successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminPanel
      title="Site Settings"
      description="Global contact details and branding. Saved changes sync to the live website."
    >
      <AdminCard>
        <SectionForm
          fields={[
            { name: "name", label: "Resort name" },
            { name: "tagline", label: "Tagline" },
            { name: "phone", label: "Phone" },
            { name: "phoneAlt", label: "Alternate phone" },
            { name: "email", label: "Email" },
            { name: "address", label: "Address" },
            {
              name: "logoUrl",
              label: "Logo",
              type: "image",
              placeholder: "/logo.png",
            },
          ]}
          values={values}
          onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))}
          onSubmit={save}
          loading={loading}
        />
      </AdminCard>
    </AdminPanel>
  );
}
