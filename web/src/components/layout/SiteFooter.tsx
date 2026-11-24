import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const brandLine1 = site.brands.slice(0, 4).join(" · ");
  const brandLine2 = site.brands.slice(4).join(" · ");

  return (
    <footer className="bg-navy-950 text-[15px] leading-[1.7] text-on-dark">
      <div className="container-page flex flex-wrap gap-x-12 gap-y-[30px] pt-space-7 pb-5">
        <div className="min-w-0 flex-[1_1_260px]">
          <div className="text-2xl font-extrabold text-white">AIREFRIN</div>
          <div className="mt-space-2">{site.tagline}</div>
        </div>
        <div className="min-w-0 flex-[1_1_180px]">
          <div className="font-bold text-white">Contacto</div>
          <div>
            <a href={site.phoneHref} className="focus-visible:focus-ring">
              {site.phoneDisplay}
            </a>
          </div>
          <div>
            <a
              href={site.whatsappHref}
              className="focus-visible:focus-ring"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp {site.whatsappDisplay}
            </a>
          </div>
          <div>
            <a href={site.emailHref} className="focus-visible:focus-ring">
              {site.email}
            </a>
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_180px]">
          <div className="font-bold text-white">Marcas</div>
          <div>{brandLine1}</div>
          <div>{brandLine2}</div>
        </div>
      </div>
      <div className="container-page border-t border-navy-700 pt-space-4 pb-[26px] text-[13px] text-on-dark-muted">
        © {year} {site.name} · Bogotá, Colombia
      </div>
    </footer>
  );
}
