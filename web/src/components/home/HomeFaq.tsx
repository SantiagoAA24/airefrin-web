"use client";

import { FaqItem } from "@/components/ui";
import { homeFaq } from "@/content/home";

export function HomeFaq() {
  return (
    <section className="bg-sky-25">
      <div className="mx-auto max-w-container-narrow px-space-5 py-space-9">
        <h2 className="m-0 text-center text-[clamp(28px,3vw,40px)] leading-[1.1] font-extrabold text-navy-800 uppercase">
          Preguntas frecuentes
        </h2>
        <div className="mt-space-6 flex flex-col gap-space-3">
          {homeFaq.map((item) => (
            <FaqItem key={item.question} question={item.question}>
              {item.answer}
            </FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
}
