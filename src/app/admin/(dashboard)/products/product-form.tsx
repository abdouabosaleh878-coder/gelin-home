"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Category = { id: string; name: string };
type ExistingImage = { id: string; url: string };

type ProductFormValues = {
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  price: number;
  salePrice: number | null;
  sku: string;
  stock: number;
  categoryId: string;
  material: string;
  dimensions: string;
  sizeList: string[];
  colorList: { name: string; hex: string }[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  onSale: boolean;
  active: boolean;
};

type ActionState = { error?: string; success?: boolean };

export function ProductForm({
  action,
  categories,
  initial,
  existingImages = [],
  submitLabel = "Save Product",
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  categories: Category[];
  initial?: Partial<ProductFormValues>;
  existingImages?: ExistingImage[];
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [removed, setRemoved] = useState<string[]>([]);

  return (
    <form action={formAction} className="space-y-8" encType="multipart/form-data">
      {state.error && (
        <p className="rounded-md bg-sale-50 px-4 py-3 text-sm text-sale-600">{state.error}</p>
      )}
      {state.success && (
        <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">Saved successfully.</p>
      )}

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Basic Information</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Product Name (English)</Label>
            <Input id="name" name="name" required defaultValue={initial?.name} />
          </div>
          <div>
            <Label htmlFor="nameAr">Product Name (Arabic)</Label>
            <Input id="nameAr" name="nameAr" dir="rtl" defaultValue={initial?.nameAr} />
          </div>
        </div>
        <div>
          <Label htmlFor="slug">URL Slug (leave blank to auto-generate)</Label>
          <Input id="slug" name="slug" defaultValue={initial?.slug} placeholder="luxury-cotton-bed-sheet" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="shortDescription">Short Description (English)</Label>
            <Textarea id="shortDescription" name="shortDescription" rows={2} defaultValue={initial?.shortDescription} />
          </div>
          <div>
            <Label htmlFor="shortDescriptionAr">Short Description (Arabic)</Label>
            <Textarea id="shortDescriptionAr" name="shortDescriptionAr" dir="rtl" rows={2} defaultValue={initial?.shortDescriptionAr} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="description">Full Description (English)</Label>
            <Textarea id="description" name="description" required rows={5} defaultValue={initial?.description} />
          </div>
          <div>
            <Label htmlFor="descriptionAr">Full Description (Arabic)</Label>
            <Textarea id="descriptionAr" name="descriptionAr" dir="rtl" rows={5} defaultValue={initial?.descriptionAr} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Pricing & Inventory</h2>
        <div className="grid gap-5 sm:grid-cols-4">
          <div>
            <Label htmlFor="price">Price (EGP)</Label>
            <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={initial?.price} />
          </div>
          <div>
            <Label htmlFor="salePrice">Sale Price (optional)</Label>
            <Input id="salePrice" name="salePrice" type="number" step="0.01" min="0" defaultValue={initial?.salePrice ?? ""} />
          </div>
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" name="sku" required defaultValue={initial?.sku} />
          </div>
          <div>
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" name="stock" type="number" min="0" required defaultValue={initial?.stock ?? 0} />
          </div>
        </div>
        <div>
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={initial?.categoryId}
            className="flex h-12 w-full rounded-md border border-navy-200 bg-white px-4 text-base text-ink-900 focus-visible:border-gold-500 focus-visible:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Specifications</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="material">Material</Label>
            <Input id="material" name="material" placeholder="100% Egyptian Cotton" defaultValue={initial?.material} />
          </div>
          <div>
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input id="dimensions" name="dimensions" placeholder="220 x 240 cm" defaultValue={initial?.dimensions} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="sizes">Sizes (comma separated)</Label>
            <Input id="sizes" name="sizes" placeholder="Single, Double, King" defaultValue={initial?.sizeList?.join(", ")} />
          </div>
          <div>
            <Label htmlFor="colors">Colors — Name:hex, comma separated</Label>
            <Input
              id="colors"
              name="colors"
              placeholder="Ivory:#F1EAE0, Sand:#D8C8AE"
              defaultValue={initial?.colorList?.map((c) => `${c.name}:${c.hex}`).join(", ")}
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-4">
        <h2 className="font-display text-lg text-navy-900">Images</h2>
        {existingImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {existingImages.map((img) => {
              const isRemoved = removed.includes(img.id);
              return (
                <label key={img.id} className="relative block cursor-pointer">
                  <div className={`relative aspect-square overflow-hidden rounded-md bg-slate-100 ${isRemoved ? "opacity-30" : ""}`}>
                    <Image src={img.url} alt="" fill sizes="120px" className="object-cover" />
                  </div>
                  <input
                    type="checkbox"
                    name="removeImage"
                    value={img.id}
                    className="absolute top-1 right-1 h-4 w-4"
                    onChange={(e) =>
                      setRemoved((prev) =>
                        e.target.checked ? [...prev, img.id] : prev.filter((id) => id !== img.id)
                      )
                    }
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-white/90 px-1 text-[10px] text-navy-900">
                    {isRemoved ? "Remove" : "Keep"}
                  </span>
                </label>
              );
            })}
          </div>
        )}
        <div>
          <Label htmlFor="images">{existingImages.length > 0 ? "Add More Images" : "Upload Images"}</Label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-sm text-ink-700 file:mr-4 file:rounded-md file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800"
          />
          <p className="mt-1.5 text-xs text-ink-400">The first image is used as the main product photo. You can upload several.</p>
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6">
        <h2 className="font-display text-lg text-navy-900">Visibility & Flags</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { name: "featured", label: "Featured", def: initial?.featured },
            { name: "bestseller", label: "Bestseller", def: initial?.bestseller },
            { name: "newArrival", label: "New Arrival", def: initial?.newArrival },
            { name: "onSale", label: "On Sale", def: initial?.onSale },
            { name: "active", label: "Active (visible)", def: initial?.active ?? true },
          ].map((f) => (
            <label key={f.name} className="flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" name={f.name} defaultChecked={f.def} className="h-4 w-4 rounded border-navy-300" />
              {f.label}
            </label>
          ))}
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
