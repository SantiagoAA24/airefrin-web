import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-space-5 py-space-9">
      <h1 className="text-heading-1 font-extrabold tracking-tight text-navy-800 uppercase">
        {site.shortName}
      </h1>
      <p className="mt-space-4 max-w-md text-center text-body text-text">
        Andamiaje del sitio web. Las pantallas se construirán en las fases
        siguientes.
      </p>
    </main>
  );
}
