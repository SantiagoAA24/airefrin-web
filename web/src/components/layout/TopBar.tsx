import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export function TopBar() {
  return (
    <div className="bg-navy-950 text-[14px] font-semibold text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-7 gap-y-2 py-[11px]">
        <div className="flex flex-wrap items-center gap-x-[26px] gap-y-2">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-space-2 focus-visible:focus-ring"
          >
            <Icon name="phone" size={18} stroke={2} />
            {site.phoneDisplay}
          </a>
          <a
            href={site.whatsappHref}
            className="inline-flex items-center gap-space-2 focus-visible:focus-ring"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="whatsapp" size={18} stroke={2} />
            {site.whatsappDisplay}
          </a>
          <a
            href={site.emailHref}
            className="topbar-extra hidden items-center gap-space-2 focus-visible:focus-ring min-[981px]:inline-flex"
          >
            <Icon name="mail" size={18} stroke={2} />
            {site.email}
          </a>
        </div>
        <div className="topbar-extra hidden items-center gap-[22px] text-[13px] min-[981px]:flex">
          <a href="/portal" className="text-cyan-300 focus-visible:focus-ring">
            Portal del cliente
          </a>
          <span className="inline-flex items-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-cyan-brand"
              aria-hidden
            >
              <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            {site.coverage}
          </span>
        </div>
      </div>
    </div>
  );
}
