import { CrudResourcePage, SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminFooterPage() {
  return (
    <div className="space-y-10">
      <SectionEditorPage
        title="Footer Settings"
        description="Newsletter description text."
        sectionId="footer"
        fields={[
          { name: "newsletterDescription", label: "Newsletter description", type: "textarea" },
        ]}
      />
      <CrudResourcePage
        title="Footer Services List"
        description="Services shown in the footer column."
        resource="footer-services"
        columns={[{ key: "label", label: "Service" }]}
        fields={[
          { name: "label", label: "Service label" },
          { name: "sortOrder", label: "Sort order", type: "number" },
        ]}
        emptyItem={{ label: "", sortOrder: 0 }}
      />
    </div>
  );
}
