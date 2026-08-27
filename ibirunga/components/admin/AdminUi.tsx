"use client";

import { useId, useRef, useState } from "react";
import {
  formatBytes,
  estimateDataUrlBytes,
  prepareImageDataUrl,
  MAX_IMAGE_UPLOAD_BYTES,
} from "@/lib/image-upload";

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

export function getItemImage(item: Record<string, unknown>, fields: Field[]) {
  for (const field of fields) {
    if (isImageField(field)) {
      const value = String(item[field.name] ?? "").trim();
      if (value) return value;
    }
  }
  for (const key of ["image", "logoUrl", "backgroundImage", "photo"]) {
    const value = String(item[key] ?? "").trim();
    if (value) return value;
  }
  return "";
}

export function getItemTitle(
  item: Record<string, unknown>,
  columns: { key: string }[],
) {
  const preferred = columns.find((col) =>
    ["title", "name", "headline"].includes(col.key),
  );
  const key = preferred?.key ?? columns[0]?.key;
  if (!key) return "Untitled";
  return String(item[key] ?? "Untitled");
}

export function AdminPanel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="mb-3 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-[#2a1d14]">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-[#5c5048]">{description}</p>
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col rounded-lg border border-[#e8e2d8] bg-white p-5 shadow-[0_8px_32px_rgba(60,40,20,0.08)] md:p-6">
      {children}
    </div>
  );
}

export function AdminImageField({
  label,
  value,
  onChange,
  placeholder,
  variant = "photo",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "logo" | "photo";
}) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [processing, setProcessing] = useState(false);
  const [broken, setBroken] = useState(false);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null);
  const src = (value ?? "").trim() || (placeholder ?? "").trim();
  const hasRealValue = !!(value ?? "").trim();
  const storedBytes = hasRealValue ? estimateDataUrlBytes(value) : 0;

  async function onFileChange(file: File | null) {
    setError("");
    setInfo("");
    setBroken(false);
    if (!file) return;

    setFileMeta({ name: file.name, size: file.size });

    if (!file.type.startsWith("image/")) {
      setError("Please choose a PNG, JPG, or WEBP image file.");
      return;
    }

    if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
      setError(
        `“${file.name}” is ${formatBytes(file.size)}. Maximum allowed is ${formatBytes(MAX_IMAGE_UPLOAD_BYTES)}. Please choose a smaller image.`,
      );
      return;
    }

    setProcessing(true);
    try {
      const prepared = await prepareImageDataUrl(file, variant);
      onChange(prepared.dataUrl);
      setFileMeta({ name: file.name, size: prepared.resultBytes });
      setInfo(
        prepared.resultBytes < prepared.originalBytes
          ? `Image ready · compressed from ${formatBytes(prepared.originalBytes)} to ${formatBytes(prepared.resultBytes)}`
          : `Image ready · ${formatBytes(prepared.resultBytes)}`,
      );
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process that image.");
    } finally {
      setProcessing(false);
    }
  }

  const isLogo = variant === "logo";

  function renderPreview(className: string) {
    if (isPreviewable(src) && !broken) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${label} preview`}
          className={className}
          onError={() => setBroken(true)}
        />
      );
    }

    return (
      <div className="px-2 text-center">
        <p className="text-xs font-medium text-[#6b6b6b]">
          {broken ? "Could not load" : "No image"}
        </p>
      </div>
    );
  }

  const sizeHint = (
    <p className="text-xs text-[#9a9a9a]">
      PNG, JPG or WEBP · max {formatBytes(MAX_IMAGE_UPLOAD_BYTES)}
      {fileMeta ? (
        <span className="mt-0.5 block font-medium text-[#5c5048]">
          {fileMeta.name} · {formatBytes(fileMeta.size)}
          {info ? " · ready to save" : ""}
        </span>
      ) : null}
      {!fileMeta && storedBytes > 0 ? (
        <span className="mt-0.5 block font-medium text-[#5c5048]">
          Current image ≈ {formatBytes(storedBytes)}
        </span>
      ) : null}
    </p>
  );

  const actionButtons = (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={processing}
        className="cursor-pointer rounded-md bg-[#6b4423] px-4 py-2 text-xs font-semibold text-white hover:bg-[#54341a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {processing ? "Processing…" : hasRealValue ? "Change image" : "Upload image"}
      </button>
      {hasRealValue ? (
        <button
          type="button"
          onClick={() => {
            setBroken(false);
            setError("");
            setInfo("");
            setFileMeta(null);
            onChange("");
          }}
          disabled={processing}
          className="rounded-md border border-[#e6e1d8] bg-white px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
        >
          Remove
        </button>
      ) : null}
    </div>
  );

  const fileInput = (
    <input
      id={inputId}
      ref={fileRef}
      type="file"
      accept="image/png,image/jpeg,image/webp,image/jpg"
      className="hidden"
      onChange={(e) => {
        void onFileChange(e.target.files?.[0] ?? null);
        e.target.value = "";
      }}
    />
  );

  const messages = (
    <>
      {error ? (
        <p className="rounded-md border border-red-200 border-l-4 border-l-red-600 bg-white px-3 py-2 text-xs font-medium text-[#2a1d14]">
          {error}
        </p>
      ) : null}
      {!error && info ? (
        <p className="rounded-md border border-[#e8e2d8] border-l-4 border-l-emerald-500 bg-white px-3 py-2 text-xs font-medium text-[#2a1d14]">
          {info}
        </p>
      ) : null}
    </>
  );

  if (isLogo) {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-[#ebe7df] bg-[#faf8f4] p-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e6e1d8] bg-white">
            {renderPreview("max-h-11 max-w-11 object-contain")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-brown-deep">
              {label.replace(/\s*path$/i, "")}
            </p>
            {sizeHint}
          </div>
          {actionButtons}
        </div>
        {fileInput}
        {messages}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-sm font-semibold text-brown-deep">
            {label.replace(/\s*path$/i, "")}
          </span>
          <div className="mt-0.5">{sizeHint}</div>
        </div>
        {actionButtons}
      </div>

      <div className="overflow-hidden rounded-md border border-[#ebe7df] bg-[#f7f4ef]">
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 flex items-center justify-center bg-[#f0ebe3]">
            {renderPreview("h-full w-full object-cover")}
          </div>
        </div>
      </div>

      {fileInput}
      {messages}
    </div>
  );
}

export function AdminInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-[#6b4423] uppercase">
        {label}
      </span>
      <input
        className="w-full rounded-md border border-[#e6e1d8] bg-[#faf9f7] px-4 py-3 text-[15px] text-[#2c2c2c] outline-none transition placeholder:text-[#a8a29a] focus:border-[#6b4423] focus:bg-white focus:ring-2 focus:ring-[#6b4423]/10"
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
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-[#6b4423] uppercase">
        {label}
      </span>
      <textarea
        className="min-h-24 w-full rounded-md border border-[#e6e1d8] bg-[#faf9f7] px-4 py-3 text-[15px] text-[#2c2c2c] outline-none transition placeholder:text-[#a8a29a] focus:border-[#6b4423] focus:bg-white focus:ring-2 focus:ring-[#6b4423]/10"
        {...props}
      />
    </label>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "ghost";
}) {
  const styles = {
    primary:
      "border border-[#6b4423] bg-[#6b4423] text-white shadow-[0_2px_10px_rgba(107,68,35,0.22)] hover:border-[#54341a] hover:bg-[#54341a] hover:shadow-[0_4px_14px_rgba(107,68,35,0.28)]",
    danger:
      "border border-red-700 bg-red-700 text-white shadow-sm hover:border-red-800 hover:bg-red-800",
    ghost:
      "border border-[#e6e1d8] bg-white text-[#3d2814] shadow-sm hover:border-[#d8d2c8] hover:bg-[#faf8f4]",
  };

  return (
    <button
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md px-6 py-2.5 text-sm font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
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
      className="flex flex-1 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {textFields.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
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
          variant={field.name.toLowerCase().includes("logo") ? "logo" : "photo"}
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

      <div className="mt-auto flex justify-start border-t border-[#efeae3] pt-4">
        <AdminButton type="submit" disabled={loading} className="min-w-40">
          {loading ? "Saving..." : submitLabel}
        </AdminButton>
      </div>
    </form>
  );
}

export function AdminModal({
  open,
  title,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[#1a1410]/55 backdrop-blur-[2px]"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className={`relative z-10 my-4 w-full rounded-lg border border-[#e8e2d8] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.22)] ${
          wide ? "max-w-2xl" : "max-w-lg"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        <div className="flex items-center justify-between border-b border-[#efeae3] px-5 py-4">
          <h2 id="admin-modal-title" className="text-base font-bold text-[#2a1d14]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#6b635a] transition hover:bg-[#f3efe8]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[min(78vh,720px)] overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

export function ContentResourceCard({
  title,
  subtitle,
  image,
  published,
  onEdit,
  onDelete,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  published?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const src = image && isPreviewable(image) ? image : "";

  return (
    <article className="overflow-hidden rounded-lg border border-[#e8e2d8] bg-white shadow-[0_4px_20px_rgba(60,40,20,0.06)] transition hover:shadow-[0_8px_28px_rgba(60,40,20,0.1)]">
      <div className="relative aspect-4/3 bg-[#f3efe8]">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium text-[#9a948c]">
            No image
          </div>
        )}
        {published === false ? (
          <span className="absolute top-2 left-2 rounded-md bg-[#1a1410]/75 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
            Draft
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-sm font-bold text-[#2a1d14]">{title}</h3>
          {subtitle ? (
            <p className="mt-1 line-clamp-2 text-xs text-[#6b635a]">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <AdminButton variant="ghost" type="button" className="flex-1" onClick={onEdit}>
            Edit
          </AdminButton>
          <AdminButton variant="danger" type="button" className="flex-1" onClick={onDelete}>
            Delete
          </AdminButton>
        </div>
      </div>
    </article>
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
