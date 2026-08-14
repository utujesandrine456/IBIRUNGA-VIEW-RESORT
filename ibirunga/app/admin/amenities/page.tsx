import { CrudResourcePage, SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminAmenitiesPage() {
  return (
    <div className="space-y-10">
      <SectionEditorPage
        title="Amenities Section Header"
        description="Eyebrow, title, and intro for The Hotel section."
        sectionId="amenities-meta"
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
      />
      <CrudResourcePage
        title="Amenity Cards"
        description="Add, edit, or delete hotel facility cards."
        resource="amenities"
        columns={[
          { key: "title", label: "Title" },
          { key: "image", label: "Image" },
        ]}
        fields={[
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image path" },
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
