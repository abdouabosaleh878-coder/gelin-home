import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BilingualField({
  label,
  nameEn,
  nameAr,
  defaultEn,
  defaultAr,
  textarea = false,
}: {
  label: string;
  nameEn: string;
  nameAr: string;
  defaultEn?: string;
  defaultAr?: string;
  textarea?: boolean;
}) {
  const Field = textarea ? Textarea : Input;
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-navy-800">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor={nameEn} className="text-xs text-ink-400">English</Label>
          <Field id={nameEn} name={nameEn} defaultValue={defaultEn} rows={textarea ? 3 : undefined} />
        </div>
        <div>
          <Label htmlFor={nameAr} className="text-xs text-ink-400">Arabic</Label>
          <Field id={nameAr} name={nameAr} dir="rtl" defaultValue={defaultAr} rows={textarea ? 3 : undefined} />
        </div>
      </div>
    </div>
  );
}
