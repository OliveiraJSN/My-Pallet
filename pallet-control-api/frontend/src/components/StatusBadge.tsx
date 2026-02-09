import { PalletStatus } from "@/types/pallet";

interface StatusBadgeProps {
  status: PalletStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<PalletStatus, string> = {
    "Disponível": "bg-green-100 text-green-700",
    "Em Uso": "bg-yellow-100 text-yellow-700",
    "Avariado": "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
