// components/dashboard/ActivityFeed.tsx
import { CheckCircle, Truck, Package, AlertCircle, Clock } from "lucide-react";

interface ActivityItem {
  id: number;
  type: 'envio' | 'pallet' | 'system';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'in-progress' | 'pending' | 'alert';
}

const activityItems: ActivityItem[] = [
  {
    id: 1,
    type: 'envio',
    title: 'Envio ENV-2024-015 entregue',
    description: 'Filial São Paulo - 24 pallets',
    time: 'há 2 horas',
    status: 'completed'
  },
  {
    id: 2,
    type: 'pallet',
    title: 'Pallets disponíveis baixos',
    description: 'Apenas 12% disponíveis na Matriz',
    time: 'há 4 horas',
    status: 'alert'
  },
  {
    id: 3,
    type: 'envio',
    title: 'Novo envio registrado',
    description: 'ENV-2024-016 para Curitiba',
    time: 'há 6 horas',
    status: 'in-progress'
  },
  {
    id: 4,
    type: 'system',
    title: 'Backup automático',
    description: 'Backup diário concluído',
    time: 'há 1 dia',
    status: 'completed'
  },
];

const typeIcons = {
  envio: Truck,
  pallet: Package,
  system: CheckCircle,
};

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  alert: 'bg-red-100 text-red-800',
};

const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  pending: Clock,
  alert: AlertCircle,
};

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Atividade Recente</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver tudo →
        </button>
      </div>
      
      <div className="space-y-4">
        {activityItems.map((item) => {
          const TypeIcon = typeIcons[item.type];
          const StatusIcon = statusIcons[item.status];
          
          return (
            <div 
              key={item.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <div className={`p-2 rounded-lg ${statusColors[item.status]}`}>
                <TypeIcon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500">{item.time}</span>
                  <div className="flex items-center gap-1">
                    <StatusIcon className="w-3 h-3" />
                    <span className="text-xs capitalize">{item.status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}