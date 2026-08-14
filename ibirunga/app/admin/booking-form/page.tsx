import { SectionEditorPage } from "@/components/admin/CrudPages";

export default function AdminBookingFormPage() {
  return (
    <SectionEditorPage
      title="Contact / Booking Form"
      description="Title and side image for the contact booking section."
      sectionId="booking-form"
      fields={[
        { name: "title", label: "Section title" },
        { name: "image", label: "Side image path" },
      ]}
    />
  );
}
