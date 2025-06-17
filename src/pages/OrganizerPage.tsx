import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Toaster } from "react-hot-toast";
import {
  Settings,
  Event,
  Group,
  Assessment,
  ExitToApp,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

export default function OrganizerPage() {
  const [tab, setTab] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const user = {
    name: "João Silva",
    role: "Participante VIP",
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <section className="min-h-screen flex bg-gray-950 relative">
      <Toaster position="top-right" />

      {/* Botão para mostrar sidebar quando oculta */}
      {!sidebarVisible && (
        <button
          onClick={() => setSidebarVisible(true)}
          className="absolute top-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-md"
          title="Mostrar menu"
        >
          <ChevronRight />
        </button>
      )}

      {/* Sidebar */}
      {sidebarVisible && (
        <aside className="w-60 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">
          <div>
            {/* Topo com logo + botão ocultar */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Eventry
              </h1>
              <button
                onClick={() => setSidebarVisible(false)}
                className="text-white hover:text-gray-300 p-1 rounded transition"
                title="Ocultar menu"
              >
                <ChevronLeft />
              </button>
            </div>

            {/* Perfil do usuário logado */}
            <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-cyan-400">{user.role}</p>
              </div>
            </div>

            {/* Navegação */}
            <nav className="space-y-4 text-gray-300">
              <button
                onClick={() => setTab(0)}
                className={`flex items-center gap-3 p-2 rounded-lg transition hover:bg-gray-800 ${
                  tab === 0 && "bg-gray-800 text-cyan-400"
                }`}
              >
                <Event fontSize="small" /> Eventos
              </button>
              <button
                onClick={() => setTab(1)}
                className={`flex items-center gap-3 p-2 rounded-lg transition hover:bg-gray-800 ${
                  tab === 1 && "bg-gray-800 text-cyan-400"
                }`}
              >
                <Group fontSize="small" /> Participantes
              </button>
              <button
                onClick={() => setTab(2)}
                className={`flex items-center gap-3 p-2 rounded-lg transition hover:bg-gray-800 ${
                  tab === 2 && "bg-gray-800 text-cyan-400"
                }`}
              >
                <Assessment fontSize="small" /> Relatórios
              </button>
              <button
                onClick={() => setTab(3)}
                className={`flex items-center gap-3 p-2 rounded-lg transition hover:bg-gray-800 ${
                  tab === 3 && "bg-gray-800 text-cyan-400"
                }`}
              >
                <Settings fontSize="small" /> Configurações
              </button>
            </nav>
          </div>

          {/* Botão Sair */}
          <button
            onClick={() => alert("Você saiu!")}
            className="mt-8 flex items-center gap-2 p-2 rounded-lg text-red-400 hover:bg-gray-800 transition text-sm"
          >
            <ExitToApp fontSize="small" /> Sair
          </button>
        </aside>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-8 shadow-xl backdrop-blur-lg"
        >
          {tab === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Seus Eventos
              </h2>
              <p className="text-gray-400 mb-6">
                Aqui você poderá visualizar, criar ou editar seus eventos.
              </p>
              <Button
                variant="contained"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-500 !text-white"
              >
                + Criar novo evento
              </Button>
            </div>
          )}

          {tab === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Lista de Participantes
              </h2>
              <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-gray-200">
                  <thead className="bg-gray-800 text-cyan-400">
                    <tr>
                      <th className="text-left p-3">Nome</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["João", "Maria", "Lucas"].map((nome, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-gray-800 even:bg-gray-900"
                      >
                        <td className="p-3">{nome}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              nome === "João"
                                ? "bg-green-600/30 text-green-400"
                                : nome === "Maria"
                                ? "bg-yellow-600/30 text-yellow-400"
                                : "bg-rose-600/30 text-rose-400"
                            }`}
                          >
                            {nome === "João"
                              ? "Pago"
                              : nome === "Maria"
                              ? "Pendente"
                              : "Cancelado"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Relatórios</h2>
              <p className="text-gray-400">
                Gráficos de vendas, performance de eventos, e mais estarão
                disponíveis aqui.
              </p>
            </div>
          )}

          {tab === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Configurações
              </h2>
              <p className="text-gray-400">
                Altere preferências de conta, notificações e aparência.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </section>
  );
}
