import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";

type CatalogStateProps = {
  title: string;
  description: string;
  className?: string;
};

function CatalogState({ title, description, className }: CatalogStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-space-3 rounded-lg border-[1.5px] border-line bg-sky-50 px-space-6 py-space-9 text-center",
        className,
      )}
      role="status"
    >
      <Icon name="snow" size={48} stroke={1.4} className="text-text-muted" />
      <h2 className="text-title font-bold text-navy-800">{title}</h2>
      <p className="max-w-md text-body text-text">{description}</p>
    </div>
  );
}

export function CatalogLoading({ className }: { className?: string }) {
  return (
    <CatalogState
      className={className}
      title="Cargando equipos"
      description="Estamos consultando el catálogo. Un momento, por favor."
    />
  );
}

export function CatalogEmpty({ className }: { className?: string }) {
  return (
    <CatalogState
      className={className}
      title="No hay equipos con esos filtros"
      description="Prueba quitando algún filtro o escríbenos por WhatsApp para cotizar otro equipo."
    />
  );
}

export function CatalogError({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <CatalogState
      className={className}
      title="No pudimos cargar el catálogo"
      description={
        message ??
        "Revisa tu conexión o intenta de nuevo en unos minutos. También puedes cotizar por WhatsApp."
      }
    />
  );
}
