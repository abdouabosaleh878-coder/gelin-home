"use client";

import { useActionState } from "react";
import Image from "next/image";
import { updateSettings } from "@/actions/settings";
import { BilingualField } from "../_shared/bilingual-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@prisma/client";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState(updateSettings, {});

  return (
    <form action={formAction} className="space-y-8" encType="multipart/form-data">
      {state.success && <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">Settings updated.</p>}

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Brand</h2>
        <div>
          <Label htmlFor="brandName">Brand Name</Label>
          <Input id="brandName" name="brandName" defaultValue={settings.brandName} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            {settings.logoUrl && (
              <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                <Image src={settings.logoUrl} alt="" fill sizes="64px" className="object-contain" />
              </div>
            )}
            <Label htmlFor="logo">Logo</Label>
            <input id="logo" name="logo" type="file" accept="image/*" className="block text-sm" />
          </div>
          <div>
            {settings.faviconUrl && (
              <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                <Image src={settings.faviconUrl} alt="" fill sizes="64px" className="object-contain" />
              </div>
            )}
            <Label htmlFor="favicon">Favicon</Label>
            <input id="favicon" name="favicon" type="file" accept="image/*" className="block text-sm" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Contact Information</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" defaultValue={settings.phone} />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} placeholder="+20100..." />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={settings.email} />
          </div>
        </div>
        <BilingualField label="Address" nameEn="addressEn" nameAr="addressAr" defaultEn={settings.addressEn} defaultAr={settings.addressAr} />
        <BilingualField label="Opening Hours" nameEn="openingHoursEn" nameAr="openingHoursAr" defaultEn={settings.openingHoursEn} defaultAr={settings.openingHoursAr} />
        <div>
          <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
          <Input id="googleMapsUrl" name="googleMapsUrl" defaultValue={settings.googleMapsUrl} />
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Social Media</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input id="instagram" name="instagram" defaultValue={settings.instagram} />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook URL</Label>
            <Input id="facebook" name="facebook" defaultValue={settings.facebook} />
          </div>
          <div>
            <Label htmlFor="tiktok">TikTok URL</Label>
            <Input id="tiktok" name="tiktok" defaultValue={settings.tiktok} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-navy-100 bg-white p-6 space-y-5">
        <h2 className="font-display text-lg text-navy-900">Delivery</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="deliveryFee">Standard Delivery Fee (EGP)</Label>
            <Input id="deliveryFee" name="deliveryFee" type="number" step="0.01" defaultValue={settings.deliveryFee} />
          </div>
          <div>
            <Label htmlFor="freeShippingThreshold">Free Shipping Above (EGP)</Label>
            <Input id="freeShippingThreshold" name="freeShippingThreshold" type="number" step="0.01" defaultValue={settings.freeShippingThreshold} />
          </div>
        </div>
        <BilingualField label="Delivery Info Text" nameEn="deliveryInfoEn" nameAr="deliveryInfoAr" defaultEn={settings.deliveryInfoEn} defaultAr={settings.deliveryInfoAr} textarea />
      </section>

      <Button type="submit" size="lg" disabled={pending}>{pending ? "Saving..." : "Save Settings"}</Button>
    </form>
  );
}
