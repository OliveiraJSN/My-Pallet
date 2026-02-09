import { pallets } from "@/data/pallets";
import StatusBadge from "@/components/StatusBadge";

export default function PalletsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pallets</h1>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Código</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {pallets.map((pallet) => (
            <tr
              key={pallet.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-3">{pallet.code}</td>
              <td className="p-3">
                <StatusBadge status={pallet.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
