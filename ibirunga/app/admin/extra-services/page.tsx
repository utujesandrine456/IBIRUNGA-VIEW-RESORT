import { CrudResourcePage, SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminExtraServicesPage() {
  return (
    <div className="space-y-10">
      <SectionEditorPage
        title="Extra Services Section"
        description="Section header and intro paragraphs."
        sectionId="extra-meta"
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Title" },
          { name: "paragraphs", label: "Paragraphs", type: "array" },
        ]}
      />
      <CrudResourcePage
        title="Extra Service Packages"
        description="Pricing cards for add-on services."
        resource="extra-services"
        columns={[
          { key: "title", label: "Title" },
          { key: "price", label: "Price" },
        ]}
        fields={[
          { name: "title", label: "Title" },
          { name: "subtitle", label: "Subtitle" },
          { name: "price", label: "Price" },
          { name: "features", label: "Features", type: "array" },
          { name: "sortOrder", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        emptyItem={{
          title: "",
          subtitle: "",
          price: "",
          features: [],
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}
