import { SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminAboutPage() {
  return (
    <SectionEditorPage
      title="About Section"
      description="About copy, images, feature bullets, and CTA label."
      sectionId="about"
      fields={[
        { name: "eyebrow", label: "Eyebrow" },
        { name: "title", label: "Title" },
        { name: "paragraphs", label: "Paragraphs", type: "array" },
        { name: "mainImage", label: "Main image", type: "image" },
        { name: "sideImage", label: "Side image", type: "image" },
        { name: "features", label: "Feature bullets", type: "array" },
        { name: "ctaLabel", label: "CTA label" },
      ]}
    />
  );
}
