"use client";

import { useEffect, useState } from "react";
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
  type?: "text" | "textarea" | "number" | "checkbox" | "array";
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
  const [message, setMessage] = useState("");

  async function load() {
    const data = await api.admin.list<T>(resource);
    setItems(data);
  }

  useEffect(() => {
    load().catch(console.error);
  }, [resource]);

  function resetForm() {
    setForm(emptyItem as Partial<T>);
    setEditingId(null);
  }

  async function save() {
    setLoading(true);
    setMessage("");
    try {
      if (editingId) {
        await api.admin.update(resource, editingId, form);
        setMessage("Updated successfully.");
      } else {
        await api.admin.create(resource, form);
        setMessage("Created successfully.");
      }
      resetForm();
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    await api.admin.remove(resource, id);
    await load();
  }

  return (
    <AdminPanel title={title} description={description}>
      <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
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
          <h2 className="mb-4 text-lg font-bold text-brown-deep">
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
            <AdminButton variant="ghost" type="button" className="mt-3" onClick={resetForm}>
              Cancel edit
            </AdminButton>
          ) : null}
          {message ? <p className="mt-4 text-sm text-brown">{message}</p> : null}
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.admin.getSection(sectionId).then(setValues).catch(console.error);
  }, [sectionId]);

  async function save() {
    setLoading(true);
    setMessage("");
    try {
      await api.admin.updateSection(sectionId, values);
      setMessage("Section saved successfully.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
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
        {message ? <p className="mt-4 text-sm text-brown">{message}</p> : null}
      </AdminCard>
    </AdminPanel>
  );
}
