"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { COOKIE_CONSENT_KEY, site } from "@/lib/site";

type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("airefrin-cookie-consent", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("airefrin-cookie-consent", onStoreChange);
  };
}

function notifyConsentChange() {
  window.dispatchEvent(new Event("airefrin-cookie-consent"));
}

function loadGtm(containerId: string) {
  if (document.getElementById("gtm-script")) return;

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function CookieConsent() {
  const isClient = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    (): Consent => null,
  );

  useEffect(() => {
    if (consent === "accepted") {
      loadGtm(site.analytics.gtm);
    }
  }, [consent]);

  function accept() {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    notifyConsentChange();
  }

  function reject() {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    notifyConsentChange();
  }

  if (!isClient || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-space-5 shadow-panel"
    >
      <div className="container-page flex flex-col gap-space-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2
            id="cookie-title"
            className="text-title font-bold text-navy-800"
          >
            Uso de cookies
          </h2>
          <p id="cookie-desc" className="mt-space-2 text-small text-text">
            Usamos cookies de analítica (Google Tag Manager) para medir visitas
            y mejorar el sitio. Solo se activan si aceptas. Consulta la{" "}
            <span className="font-bold text-blue-600">
              [Política de datos]
            </span>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-space-3">
          <Button variant="outline" size="sm" onClick={reject}>
            Rechazar
          </Button>
          <Button size="sm" onClick={accept}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
