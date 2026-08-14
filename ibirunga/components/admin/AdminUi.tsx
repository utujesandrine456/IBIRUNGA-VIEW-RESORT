"use client";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "array";
  placeholder?: string;
};

export function AdminPanel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brown-deep">{title}</h1>
        {description ? <p className="mt-2 text-muted">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-[0_8px_30px_rgba(60,40,20,0.06)]">
      {children}
    </div>
  );
}

export function AdminInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brown-deep">{label}</span>
      <input
        className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brown"
        {...props}
      />
    </label>
  );
}

export function AdminTextarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brown-deep">{label}</span>
      <textarea
        className="min-h-28 w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-brown"
        {...props}
      />
    </label>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "ghost";
}) {
  const styles = {
    primary: "bg-brown text-white hover:bg-brown-dark",
    danger: "bg-red-700 text-white hover:bg-red-800",
    ghost: "border border-border bg-white text-brown-deep hover:bg-cream",
  };

  return (
    <button
      className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SectionForm({
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel = "Save changes",
  loading,
}: {
  fields: Field[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onSubmit: () => void;
  submitLabel?: string;
  loading?: boolean;
}) {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {fields.map((field) => {
        const value = values[field.name];

        if (field.type === "textarea") {
          return (
            <AdminTextarea
              key={field.name}
              label={field.label}
              value={String(value ?? "")}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        }

        if (field.type === "array") {
          return (
            <AdminTextarea
              key={field.name}
              label={`${field.label} (one per line)`}
              value={Array.isArray(value) ? value.join("\n") : String(value ?? "")}
              onChange={(e) =>
                onChange(
                  field.name,
                  e.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
                )
              }
            />
          );
        }

        if (field.type === "checkbox") {
          return (
            <label key={field.name} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => onChange(field.name, e.target.checked)}
              />
              <span className="text-sm font-semibold text-brown-deep">{field.label}</span>
            </label>
          );
        }

        return (
          <AdminInput
            key={field.name}
            label={field.label}
            type={field.type ?? "text"}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) =>
              onChange(
                field.name,
                field.type === "number" ? Number(e.target.value) : e.target.value,
              )
            }
          />
        );
      })}
      <AdminButton type="submit" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </AdminButton>
    </form>
  );
}

export function ResourceTable<T extends { id: string }>({
  items,
  columns,
  onEdit,
  onDelete,
}: {
  items: T[];
  columns: { key: string; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-brown/70">
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-3 font-semibold">
                {col.label}
              </th>
            ))}
            <th className="px-3 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border/70">
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-4 align-top">
                  {String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              <td className="px-3 py-4">
                <div className="flex gap-2">
                  <AdminButton variant="ghost" type="button" onClick={() => onEdit(item)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" type="button" onClick={() => onDelete(item.id)}>
                    Delete
                  </AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
