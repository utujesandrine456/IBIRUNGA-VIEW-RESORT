import { SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminFooterPage() {
  return (
    <SectionEditorPage
      title="Footer Settings"
      description="Newsletter text. Services in the footer match The Hotel cards automatically."
      sectionId="footer"
      fields={[
        { name: "newsletterDescription", label: "Newsletter description", type: "textarea" },
      ]}
    />
  );
}
