import { SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminVideoPage() {
  return (
    <SectionEditorPage
      title="Video Tour Section"
      description="Video tour title, background image, and YouTube URL."
      sectionId="video"
      fields={[
        { name: "title", label: "Title" },
        { name: "backgroundImage", label: "Background image path" },
        { name: "youtubeUrl", label: "YouTube URL" },
      ]}
    />
  );
}
