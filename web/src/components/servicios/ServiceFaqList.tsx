"use client";

import { FaqItem } from "@/components/ui";
import type { ServiceFaq } from "@/content/servicios";

type ServiceFaqListProps = {
  title: string;
  items: readonly ServiceFaq[];
};

export function ServiceFaqList({ title, items }: ServiceFaqListProps) {
  return (
    <section className="bg-sky-25 px-space-5 pb-space-9 pt-5">
      <div className="mx-auto max-w-container-narrow">
        <h2 className="m-0 text-center text-[clamp(28px,3vw,40px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
          {title}
        </h2>
        <div className="mt-space-6 flex flex-col gap-space-3">
          {items.map((item) => (
            <FaqItem key={item.question} question={item.question}>
              {item.answer}
            </FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
}
