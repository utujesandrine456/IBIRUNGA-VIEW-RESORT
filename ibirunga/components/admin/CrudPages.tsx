"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AdminCard,
  AdminPanel,
  AdminButton,
  AdminModal,
  ContentResourceCard,
  SectionForm,
  getItemImage,
  getItemTitle,
} from "@/components/admin/AdminUi";
import { api } from "@/lib/api";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "array" | "image";
};

function getItemSubtitle(
  item: Record<string, unknown>,
  columns: { key: string }[],
  titleKey: string,
) {
  const secondary = columns.find(
    (col) => col.key !== titleKey && !col.key.toLowerCase().includes("image"),
  );
  if (!secondary) return "";
  return String(item[secondary.key] ?? "");
}

export function CrudResourcePage<T extends { id: string }>({
  title,
  description,
  resource,
  columns,
  fields,
  emptyItem,
  addLabel = "Add another",
}: {
  title: string;
  description: string;
  resource: string;
  columns: { key: string; label: string }[];
  fields: Field[];
  emptyItem: Record<string, unknown>;
  addLabel?: string;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState<Partial<T>>(emptyItem as Partial<T>);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try {
      const data = await api.admin.list<T>(resource);
      setItems(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load items");
    }
  }

  useEffect(() => {
    load();
  }, [resource]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyItem as Partial<T>);
    setFormOpen(true);
  }

  function openEdit(item: T) {
    setEditingId(item.id);
    setForm(item);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyItem as Partial<T>);
  }

  async function save() {
    setLoading(true);
    try {
      if (editingId) {
        await api.admin.update(resource, editingId, form);
        toast.success("Item updated successfully.");
      } else {
        await api.admin.create(resource, form);
        toast.success("Item created successfully.");
      }
      closeForm();
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.admin.remove(resource, deleteTarget.id);
      toast.success("Item deleted successfully.");
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  const titleKey =
    columns.find((col) => ["title", "name", "headline"].includes(col.key))?.key ??
    columns[0]?.key ??
    "title";

  return (
    <AdminPanel title={title} description={description} wide>
      <div className="mb-3 flex shrink-0 flex-wrap items-center justify-end gap-3">
        <AdminButton type="button" onClick={openCreate}>
          + {addLabel}
        </AdminButton>
      </div>

      {items.length === 0 ? (
        <AdminCard>
          <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-medium text-[#6b635a]">No items yet.</p>
            <p className="mt-1 text-xs text-[#9a948c]">
              Click &ldquo;{addLabel}&rdquo; to create your first entry.
            </p>
            <AdminButton type="button" className="mt-4" onClick={openCreate}>
              + {addLabel}
            </AdminButton>
          </div>
        </AdminCard>
      ) : (
        <div className="min-h-0 flex-1">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const record = item as Record<string, unknown>;
              return (
                <ContentResourceCard
                  key={item.id}
                  title={getItemTitle(record, columns)}
                  subtitle={getItemSubtitle(record, columns, titleKey)}
                  image={getItemImage(record, fields)}
                  published={record.published as boolean | undefined}
                  onEdit={() => openEdit(item)}
                  onDelete={() => setDeleteTarget(item)}
                />
              );
            })}
          </div>
        </div>
      )}

      <AdminModal
        open={formOpen}
        title={editingId ? "Edit item" : addLabel}
        onClose={closeForm}
        wide
      >
        <SectionForm
          fields={fields}
          values={form as Record<string, unknown>}
          onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
          onSubmit={save}
          loading={loading}
          submitLabel={editingId ? "Save changes" : "Create item"}
        />
      </AdminModal>

      <AdminModal
        open={!!deleteTarget}
        title="Delete item"
        onClose={() => setDeleteTarget(null)}
      >
        <p className="text-sm leading-relaxed text-[#5c5048]">
          Delete{" "}
          <strong className="text-[#2a1d14]">
            {deleteTarget ? getItemTitle(deleteTarget as Record<string, unknown>, columns) : ""}
          </strong>
          ? This cannot be undone.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <AdminButton variant="ghost" type="button" onClick={() => setDeleteTarget(null)}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" type="button" disabled={deleting} onClick={confirmDelete}>
            {deleting ? "Deleting..." : "Delete"}
          </AdminButton>
        </div>
      </AdminModal>
    </AdminPanel>
  );
}

export function SectionEditorPage({
  title,
  description,
  sectionId,
  fields,
}: {
  title: string;
  description: string;
  sectionId: string;
  fields: Field[];
}) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.admin
      .getSection(sectionId)
      .then(setValues)
      .catch((err) => toast.error(err instanceof Error ? err.message : "Failed to load section"));
  }, [sectionId]);

  async function save() {
    setLoading(true);
    try {
      const payload = { ...values };
      delete payload.ctaUrl;
      delete payload.buttonLink;
      delete payload.buttonUrl;
      await api.admin.updateSection(sectionId, payload);
      toast.success("Section updated successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminPanel title={title} description={description}>
      <AdminCard>
        <SectionForm
          fields={fields}
          values={values}
          onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))}
          onSubmit={save}
          loading={loading}
        />
      </AdminCard>
    </AdminPanel>
  );
}
