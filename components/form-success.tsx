import { CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/button";

export function FormSuccess({
  title,
  message,
  waUrl,
  onReset,
}: {
  title: string;
  message: string;
  waUrl: string;
  onReset: () => void;
}) {
  return (
    <div className="card flex flex-col items-center gap-5 p-10 text-center">
      <span
        className="grid size-16 place-items-center rounded-full"
        style={{ background: "var(--color-success-bg)" }}
      >
        <CheckCircle2
          className="size-8"
          style={{ color: "var(--color-success)" }}
        />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="h3">{title}</h3>
        <p className="mx-auto max-w-md text-ink-2">{message}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={waUrl} external variant="wa" size="lg">
          <MessageCircle />
          Lanjutkan via WhatsApp
        </Button>
        <Button type="button" onClick={onReset} variant="secondary" size="lg">
          <RotateCcw />
          Kirim Lagi
        </Button>
      </div>
    </div>
  );
}
