import { CrudResourcePage, SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminAmenitiesPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <SectionEditorPage
        title="Hotel Section Header"
        description="Eyebrow, title, and intro for The Hotel section on the homepage."
        sectionId="amenities-meta"
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
      />
      <CrudResourcePage
        title="Hotel Facility Cards"
        description="These cards appear in The Hotel section and as Services in the footer."
        resource="amenities"
        columns={[
          { key: "title", label: "Title" },
          { key: "image", label: "Image" },
        ]}
        fields={[
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image", type: "image" },
          { name: "sortOrder", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        emptyItem={{
          title: "",
          description: "",
          image: "",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}
