import { CrudResourcePage, SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-10">
      <SectionEditorPage
        title="Testimonials Section Header"
        description="Eyebrow and title for client reviews."
        sectionId="testimonials-meta"
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Title" },
        ]}
      />
      <CrudResourcePage
        title="Testimonials"
        description="Manage guest review cards."
        resource="testimonials"
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
        ]}
        fields={[
          { name: "name", label: "Name" },
          { name: "role", label: "Role" },
          { name: "text", label: "Review text", type: "textarea" },
          { name: "image", label: "Image path" },
          { name: "sortOrder", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        emptyItem={{
          name: "",
          role: "",
          text: "",
          image: "",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}
