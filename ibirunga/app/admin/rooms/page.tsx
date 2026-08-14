import { CrudResourcePage, SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminRoomsPage() {
  return (
    <div className="space-y-10">
      <SectionEditorPage
        title="Rooms Section Header"
        description="Eyebrow, title, and intro for Rooms & Suites."
        sectionId="rooms-meta"
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
      />
      <CrudResourcePage
        title="Rooms"
        description="Manage room cards shown in the homepage slider."
        resource="rooms"
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "price", label: "Price" },
        ]}
        fields={[
          { name: "title", label: "Title" },
          { name: "category", label: "Category" },
          { name: "price", label: "Price" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image path" },
          { name: "sortOrder", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        emptyItem={{
          title: "",
          category: "",
          price: "",
          description: "",
          image: "",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}
