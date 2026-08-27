import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translate } from "@/i18n/translate";

type Post = { id: string; imageUrl: string; link: string };

export async function InstagramGallery({ locale, posts }: { locale: Locale; posts: Post[] }) {
  if (posts.length === 0) return null;
  const dict = await getDictionary(locale);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl text-navy-900 md:text-3xl">
          {translate(dict, "home.instagramTitle")}
        </h2>
        <p className="mt-2 text-ink-500">{translate(dict, "home.instagramSub")}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {posts.slice(0, 6).map((post) => {
          const Tag = post.link ? "a" : "div";
          return (
            <Tag
              key={post.id}
              {...(post.link ? { href: post.link, target: "_blank", rel: "noopener noreferrer" } : {})}
              className="img-zoom relative block aspect-square overflow-hidden rounded-md bg-slate-100"
            >
              <Image src={post.imageUrl} alt="Gelin Home on Instagram" fill sizes="200px" className="object-cover" />
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
