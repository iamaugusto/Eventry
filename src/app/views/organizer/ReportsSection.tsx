import { motion } from "framer-motion";

export function ReportsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Relatórios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">
            Vendas Mensais
          </h3>
          <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-500">
            Gráfico de vendas
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-purple-400 mb-4">
            Participação por Evento
          </h3>
          <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-500">
            Gráfico de participação
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg md:col-span-2"
        >
          <h3 className="text-lg font-semibold text-green-400 mb-4">
            Comparativo Anual
          </h3>
          <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-500">
            Gráfico comparativo
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
