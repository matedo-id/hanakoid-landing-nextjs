"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/button";
import { Input, Textarea } from "@/components/field";
import { Toast } from "@/components/toast";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [toast, setToast] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";

    const next: Errors = {};
    if (!name) next.name = "Nama wajib diisi.";
    if (!email) next.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Format email tidak valid.";
    if (!message) next.message = "Pesan wajib diisi.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    form.reset();
    setToast(true);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="card flex flex-col gap-5 p-7"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            id="name"
            name="name"
            label="Nama"
            placeholder="Nama lengkap"
            required
            error={errors.name}
          />
          <Input
            id="instansi"
            name="instansi"
            label="Instansi"
            placeholder="Nama instansi / perusahaan"
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
            label="Telepon"
            placeholder="08xx xxxx xxxx"
          />
        </div>
        <Textarea
          id="message"
          name="message"
          label="Pesan"
          placeholder="Ceritakan kebutuhan atau pertanyaan Anda…"
          required
          error={errors.message}
          rows={5}
        />
        <div>
          <Button type="submit" size="lg">
            <Send />
            Kirim Pesan
          </Button>
        </div>
      </form>

      <Toast
        open={toast}
        onClose={() => setToast(false)}
        message="Pesan terkirim! Tim kami akan menghubungi Anda segera."
      />
    </>
  );
}
