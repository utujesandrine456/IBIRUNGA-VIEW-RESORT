import { SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminHeroPage() {
  return (
    <SectionEditorPage
      title="Hero Section"
      description="Homepage hero headline, copy, CTA, and background image."
      sectionId="hero"
      fields={[
        { name: "headline", label: "Headline" },
        { name: "subtext", label: "Subtext", type: "textarea" },
        { name: "ctaLabel", label: "Button label" },
        { name: "ctaUrl", label: "Button link" },
        { name: "backgroundImage", label: "Background image path" },
      ]}
    />
  );
}
