import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">MyPallet</h1>

      <Link
        href="/envios/novo"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Novo envio de pallets
      </Link>
    </main>
  );
}
