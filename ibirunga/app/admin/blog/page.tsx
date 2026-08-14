import { CrudResourcePage, SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminBlogPage() {
  return (
    <div className="space-y-10">
      <SectionEditorPage
        title="Blog Section Header"
        description="Eyebrow, title, and intro for the blog section."
        sectionId="blog-meta"
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
      />
      <CrudResourcePage
        title="Blog Posts"
        description="Manage homepage blog cards."
        resource="blog-posts"
        columns={[
          { key: "title", label: "Title" },
          { key: "date", label: "Date" },
        ]}
        fields={[
          { name: "title", label: "Title" },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          { name: "date", label: "Date label" },
          { name: "image", label: "Image path" },
          { name: "sortOrder", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
        emptyItem={{
          title: "",
          excerpt: "",
          date: "",
          image: "",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}
