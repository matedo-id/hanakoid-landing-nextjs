"use client";

import { useState } from "react";
import { Plus, Trash2, Send, ClipboardList } from "lucide-react";
import { Button } from "@/components/button";
import { Input, Select, Textarea } from "@/components/field";
import { Toast } from "@/components/toast";
import { Badge } from "@/components/badge";
import { products, solutions } from "@/lib/data";

interface Item {
  uid: number;
  productId: string;
  qty: number;
}

let counter = 1;
const newItem = (productId = ""): Item => ({
  uid: counter++,
  productId,
  qty: 1,
});

interface Errors {
  name?: string;
  email?: string;
  instansi?: string;
}

export function RfqForm({
  initialProduct,
  initialSolution,
}: {
  initialProduct?: string;
  initialSolution?: string;
}) {
  const [items, setItems] = useState<Item[]>([
    newItem(initialProduct && products.some((p) => p.id === initialProduct) ? initialProduct : ""),
  ]);
  const [errors, setErrors] = useState<Errors>({});
  const [toast, setToast] = useState(false);

  const solution = solutions.find((s) => s.key === initialSolution);
  const filledItems = items.filter((i) => i.productId);
  const totalQty = filledItems.reduce((sum, i) => sum + (i.qty || 0), 0);

  function updateItem(uid: number, patch: Partial<Item>) {
    setItems((list) =>
      list.map((i) => (i.uid === uid ? { ...i, ...patch } : i))
    );
  }
  function addItem() {
    setItems((list) => [...list, newItem()]);
  }
  function removeItem(uid: number) {
    setItems((list) =>
      list.length > 1 ? list.filter((i) => i.uid !== uid) : list
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const instansi = data.get("instansi")?.toString().trim() ?? "";

    const next: Errors = {};
    if (!name) next.name = "Nama PIC wajib diisi.";
    if (!instansi) next.instansi = "Nama instansi wajib diisi.";
    if (!email) next.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Format email tidak valid.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    form.reset();
    setItems([newItem()]);
    setToast(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
        {solution && (
          <div className="card flex items-center gap-3 bg-primary-050 p-4">
            <ClipboardList className="size-5 text-primary" />
            <p className="text-sm text-primary-dark">
              Penawaran untuk paket solusi:{" "}
              <strong>{solution.title}</strong>
            </p>
          </div>
        )}

        {/* Data PIC */}
        <fieldset className="card flex flex-col gap-5 p-7">
          <legend className="h4 px-2">Data Pemohon</legend>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              id="name"
              name="name"
              label="Nama PIC"
              placeholder="Nama penanggung jawab"
              required
              error={errors.name}
            />
            <Input
              id="instansi"
              name="instansi"
              label="Instansi"
              placeholder="Nama instansi / perusahaan"
              required
              error={errors.instansi}
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="email@instansi.go.id"
              required
              error={errors.email}
            />
            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Telepon / WhatsApp"
              placeholder="08xx xxxx xxxx"
            />
            <Select id="type" name="type" label="Jenis Instansi" defaultValue="">
              <option value="" disabled>
                Pilih jenis instansi
              </option>
              <option>Pemerintahan</option>
              <option>Kampus / Pendidikan</option>
              <option>Rumah Sakit / Kesehatan</option>
              <option>BUMN / Swasta</option>
              <option>Lainnya</option>
            </Select>
            <Select
              id="timeline"
              name="timeline"
              label="Target Pengadaan"
              defaultValue=""
            >
              <option value="" disabled>
                Pilih estimasi waktu
              </option>
              <option>Secepatnya (≤ 1 bulan)</option>
              <option>1–3 bulan</option>
              <option>3–6 bulan</option>
              <option>Masih perencanaan</option>
            </Select>
          </div>
        </fieldset>

        {/* Item pengadaan */}
        <fieldset className="card flex flex-col gap-5 p-7">
          <legend className="h4 px-2">Item Pengadaan</legend>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.uid}
                className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_120px_auto]"
              >
                <Select
                  aria-label="Pilih produk"
                  value={item.productId}
                  onChange={(e) =>
                    updateItem(item.uid, { productId: e.target.value })
                  }
                >
                  <option value="">Pilih produk…</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.brand}
                    </option>
                  ))}
                </Select>
                <Input
                  aria-label="Jumlah"
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    updateItem(item.uid, {
                      qty: Math.max(1, Number(e.target.value) || 1),
                    })
                  }
                />
                <button
                  type="button"
                  aria-label="Hapus item"
                  onClick={() => removeItem(item.uid)}
                  className="icon-btn self-start"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button type="button" variant="secondary" size="sm" onClick={addItem}>
              <Plus />
              Tambah Item
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted">
              Ringkasan:
              <Badge variant="primary">{filledItems.length} jenis</Badge>
              <Badge variant="accent">{totalQty} unit</Badge>
            </div>
          </div>
        </fieldset>

        {/* Catatan */}
        <fieldset className="card flex flex-col gap-5 p-7">
          <legend className="h4 px-2">Catatan Tambahan</legend>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              id="budget"
              name="budget"
              label="Estimasi Anggaran (opsional)"
              placeholder="cth: Rp 250.000.000"
            />
            <Input
              id="location"
              name="location"
              label="Lokasi Pemasangan"
              placeholder="Kota / kabupaten"
            />
          </div>
          <Textarea
            id="notes"
            name="notes"
            label="Detail Kebutuhan"
            rows={4}
            placeholder="Jelaskan spesifikasi, jumlah titik, atau kebutuhan khusus lainnya…"
            defaultValue={
              solution ? `Tertarik dengan paket solusi: ${solution.title}.` : ""
            }
          />
        </fieldset>

        <div>
          <Button type="submit" size="lg">
            <Send />
            Kirim Permintaan Penawaran
          </Button>
        </div>
      </form>

      <Toast
        open={toast}
        onClose={() => setToast(false)}
        message="Permintaan penawaran terkirim! Tim sales kami akan menindaklanjuti."
      />
    </>
  );
}
