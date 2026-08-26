import { SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminHeroPage() {
  return (
    <SectionEditorPage
      title="Hero Section"
      description="Homepage hero headline, button label, and background image."
      sectionId="hero"
      fields={[
        { name: "headline", label: "Headline" },
        { name: "ctaLabel", label: "Button label" },
        { name: "subtext", label: "Subtext", type: "textarea" },
        { name: "backgroundImage", label: "Background image", type: "image" },
      ]}
    />
  );
}
