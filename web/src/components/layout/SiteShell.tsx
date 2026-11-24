import type { ReactNode } from "react";
import { CookieConsent } from "./CookieConsent";
import { FloatingActions } from "./FloatingActions";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TopBar } from "./TopBar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
      <FloatingActions />
      <CookieConsent />
    </>
  );
}
