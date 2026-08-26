"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AdminCard,
  AdminPanel,
  AdminButton,
  ResourceTable,
  SectionForm,
} from "@/components/admin/AdminUi";
import { api } from "@/lib/api";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "array" | "image";
};

export function CrudResourcePage<T extends { id: string }>({
  title,
  description,
  resource,
  columns,
  fields,
  emptyItem,
}: {
  title: string;
  description: string;
  resource: string;
  columns: { key: string; label: string }[];
  fields: Field[];
  emptyItem: Record<string, unknown>;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState<Partial<T>>(emptyItem as Partial<T>);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  function resetForm() {
    setForm(emptyItem as Partial<T>);
    setEditingId(null);
  }

  async function save() {
    setLoading(true);
    try {
      if (editingId) {
        await api.admin.update(resource, editingId, form);
        toast.success("Item updated successfully");
      } else {
        await api.admin.create(resource, form);
        toast.success("Item created successfully");
      }
      resetForm();
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    try {
      await api.admin.remove(resource, id);
      toast.success("Item deleted successfully");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <AdminPanel title={title} description={description} wide>
      <div className="grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <AdminCard>
          <ResourceTable
            items={items}
            columns={columns}
            onEdit={(item) => {
              setEditingId(item.id);
              setForm(item);
            }}
            onDelete={remove}
          />
        </AdminCard>

        <AdminCard>
          <h2 className="mb-2.5 text-sm font-bold text-brown-deep">
            {editingId ? "Edit item" : "Add new item"}
          </h2>
          <SectionForm
            fields={fields}
            values={form as Record<string, unknown>}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
            onSubmit={save}
            loading={loading}
            submitLabel={editingId ? "Update" : "Create"}
          />
          {editingId ? (
            <AdminButton variant="ghost" type="button" className="mt-2" onClick={resetForm}>
              Cancel edit
            </AdminButton>
          ) : null}
        </AdminCard>
      </div>
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
      toast.success("Section saved successfully");
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
