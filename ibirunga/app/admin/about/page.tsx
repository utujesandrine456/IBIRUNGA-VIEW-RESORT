import { SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminAboutPage() {
  return (
    <SectionEditorPage
      title="About Section"
      description="About copy, images, feature bullets, and CTA."
      sectionId="about"
      fields={[
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title" },
        { name: "paragraphs", label: "Paragraphs", type: "array" },
        { name: "mainImage", label: "Main image path" },
        { name: "sideImage", label: "Side image path" },
        { name: "features", label: "Feature bullets", type: "array" },
        { name: "ctaLabel", label: "CTA label" },
        { name: "ctaUrl", label: "CTA link" },
      ]}
    />
  );
}
