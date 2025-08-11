import { motion } from "framer-motion";
import { TextField } from "@mui/material";
import { Search, FilterList, MoreVert } from "@mui/icons-material";
import { type Participant } from "../../models/Participant";

interface ParticipantsTableProps {
  participants: Participant[];
}

export function ParticipantsTable({ participants }: ParticipantsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Lista de Participantes
      </h2>
      <div className="bg-gray-800/50 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="relative flex-1 max-w-md">
            <TextField
              placeholder="Buscar participantes..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <Search className="text-gray-400 mr-2" />,
                className: "text-white bg-gray-700 border-gray-600 rounded-lg",
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FilterList fontSize="small" />
            <span>Filtrar</span>
          </motion.button>
        </div>
        <table className="w-full text-sm text-gray-200">
          <thead className="bg-gray-800 text-cyan-400">
            <tr>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Evento</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((item, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="odd:bg-gray-800 even:bg-gray-900 hover:bg-gray-700/50 transition-colors"
              >
                <td className="p-3">{item.nome}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.evento}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === "Pago"
                        ? "bg-green-600/30 text-green-400"
                        : item.status === "Pendente"
                        ? "bg-yellow-600/30 text-yellow-400"
                        : "bg-rose-600/30 text-rose-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <MoreVert fontSize="small" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
