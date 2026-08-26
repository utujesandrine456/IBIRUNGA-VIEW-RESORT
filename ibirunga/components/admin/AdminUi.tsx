"use client";

import { useId, useRef, useState } from "react";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "array" | "image";
  placeholder?: string;
};

/** Fields that must never appear in admin forms (links are hardcoded in the frontend). */
const HIDDEN_FIELD_NAMES = new Set([
  "ctaUrl",
  "buttonLink",
  "buttonUrl",
]);

const IMAGE_LIBRARY = [
  "/logo.png",
  "/LUCIMAGES_15.JPG",
  "/LUCIMAGES_16.JPG",
  "/LUCIMAGES_20.JPG",
  "/LUCIMAGES_21.JPG",
  "/LUCIMAGES_22.JPG",
  "/LUCIMAGES_26.JPG",
  "/LUCIMAGES_27.JPG",
  "/LUCIMAGES_30.JPG",
  "/LUCIMAGES_34.JPG",
  "/LUCIMAGES_37.JPG",
  "/LUCIMAGES_42.JPG",
  "/LUCIMAGES_46.JPG",
  "/LUCIMAGES_48.JPG",
];

function isImageField(field: Field) {
  if (field.type === "image") return true;
  const n = field.name.toLowerCase();
  const label = field.label.toLowerCase();
  if (label.includes("path")) return true;
  return (
    n === "image" ||
    n === "logourl" ||
    n.endsWith("image") ||
    n.endsWith("imageurl") ||
    n.includes("backgroundimage") ||
    n.includes("logo")
  );
}

function isPreviewable(src: string) {
  return (
    !!src &&
    (src.startsWith("/") ||
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("data:image/"))
  );
}

export function AdminPanel({
  title,
  description,
  children,
  wide,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`mx-auto w-full ${wide ? "max-w-5xl" : "max-w-4xl"}`}>
      <div className="mb-3 text-center sm:text-left">
        <h1 className="text-xl font-bold text-[#2a1d14] drop-shadow-sm">{title}</h1>
        {description ? (
          <p className="mt-0.5 text-sm text-[#4a3f36]">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#ebe7df] bg-white/95 p-4 shadow-[0_12px_40px_rgba(60,40,20,0.12)] backdrop-blur-sm md:p-5">
      {children}
    </div>
  );
}

export function AdminImageField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState("");
  const [broken, setBroken] = useState(false);
  const src = (value ?? "").trim() || (placeholder ?? "").trim();
  const hasRealValue = !!(value ?? "").trim();

  function onFileChange(file: File | null) {
    setError("");
    setBroken(false);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 2_500_000) {
      setError("Image must be under 2.5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) onChange(result);
      setPicking(false);
    };
    reader.onerror = () => setError("Could not read that image.");
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-brown-deep">{label.replace(/\s*path$/i, "")}</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setPicking((v) => !v)}
            className="rounded-md border border-border bg-white px-3 py-1 text-xs font-semibold text-brown-deep hover:bg-cream"
          >
            {picking ? "Close" : "Library"}
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-md bg-[#6b4423] px-3 py-1 text-xs font-semibold text-white! hover:bg-[#54341a]"
          >
            {hasRealValue ? "Edit image" : "Upload image"}
          </button>
          {hasRealValue ? (
            <button
              type="button"
              onClick={() => {
                setBroken(false);
                onChange("");
              }}
              className="rounded-md border border-border bg-white px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#ebe7df] bg-[#f7f4ef]">
        <div className="relative flex h-28 items-center justify-center sm:h-32">
          {isPreviewable(src) && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${label} preview`}
              className="h-full w-full object-contain bg-[#f0ebe3] p-2"
              onError={() => setBroken(true)}
            />
          ) : (
            <div className="px-4 text-center">
              <p className="text-sm font-medium text-[#6b6b6b]">
                {broken ? "Image could not be loaded" : "No image selected"}
              </p>
              <p className="mt-0.5 text-xs text-[#9a9a9a]">Upload a file or pick from the library</p>
            </div>
          )}
        </div>
      </div>

      <input
        id={inputId}
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onFileChange(e.target.files?.[0] ?? null);
          e.target.value = "";
        }}
      />

      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      {picking ? (
        <div className="grid grid-cols-4 gap-1.5 rounded-md border border-[#ebe7df] bg-white p-2 sm:grid-cols-5">
          {IMAGE_LIBRARY.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setBroken(false);
                onChange(item);
                setPicking(false);
              }}
              className={`overflow-hidden rounded border transition ${
                src === item ? "border-brown ring-2 ring-brown/30" : "border-transparent hover:border-brown/40"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item} alt="" className="h-12 w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AdminInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-brown-deep">{label}</span>
      <input
        className="w-full rounded-md border border-border px-2.5 py-1.5 text-sm outline-none focus:border-brown"
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
      <span className="mb-1 block text-xs font-semibold text-brown-deep">{label}</span>
      <textarea
        className="min-h-16 w-full rounded-md border border-border px-2.5 py-1.5 text-sm outline-none focus:border-brown"
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
    primary: "bg-brown text-white! hover:bg-brown-dark",
    danger: "bg-red-700 text-white! hover:bg-red-800",
    ghost: "border border-border bg-white text-brown-deep hover:bg-cream",
  };

  return (
    <button
      className={`rounded-md px-4 py-1.5 text-sm font-semibold transition disabled:opacity-50 ${styles[variant]}`}
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
  const visibleFields = fields.filter((f) => !HIDDEN_FIELD_NAMES.has(f.name));

  const imageFields = visibleFields.filter(isImageField);
  const textFields = visibleFields.filter(
    (f) =>
      !isImageField(f) &&
      (!f.type || f.type === "text" || f.type === "number"),
  );
  const otherFields = visibleFields.filter(
    (f) =>
      !isImageField(f) &&
      f.type &&
      f.type !== "text" &&
      f.type !== "number",
  );

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {textFields.length > 0 ? (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {textFields.map((field) => {
            const value = values[field.name];
            return (
              <AdminInput
                key={field.name}
                label={field.label.replace(/\s*path$/i, "")}
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
        </div>
      ) : null}

      {imageFields.map((field) => (
        <AdminImageField
          key={field.name}
          label={field.label}
          value={String(values[field.name] ?? "")}
          placeholder={field.placeholder}
          onChange={(next) => onChange(field.name, next)}
        />
      ))}

      {otherFields.map((field) => {
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
                  e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                )
              }
            />
          );
        }

        if (field.type === "checkbox") {
          return (
            <label key={field.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => onChange(field.name, e.target.checked)}
              />
              <span className="text-sm font-semibold text-brown-deep">{field.label}</span>
            </label>
          );
        }

        return null;
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
              <th key={col.key} className="px-2 py-2 font-semibold">
                {col.label}
              </th>
            ))}
            <th className="px-2 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border/70">
              {columns.map((col) => {
                const raw = (item as Record<string, unknown>)[col.key];
                const text = String(raw ?? "");
                const showThumb =
                  (col.key.toLowerCase().includes("image") ||
                    col.key.toLowerCase().includes("logo")) &&
                  isPreviewable(text);
                return (
                  <td key={col.key} className="px-2 py-2.5 align-middle">
                    {showThumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={text}
                        alt=""
                        className="h-10 w-14 rounded object-cover"
                      />
                    ) : (
                      <span className="line-clamp-2">{text}</span>
                    )}
                  </td>
                );
              })}
              <td className="px-2 py-2.5">
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
