import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Event,
  Group,
  Assessment,
  ExitToApp,
  ChevronLeft,
  ArrowForward,
} from "@mui/icons-material";

interface OrganizerSidebarProps {
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
  tab: number;
  setTab: (tab: number) => void;
  handleLogout: () => void;
  user: {
    name: string;
    role: string;
  };
  getInitials: (name: string) => string;
}

export function OrganizerSidebar({
  sidebarVisible,
  setSidebarVisible,
  tab,
  setTab,
  handleLogout,
  user,
  getInitials,
}: OrganizerSidebarProps) {
  return (
    <AnimatePresence>
      {sidebarVisible && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`w-60 bg-gray-900/95 backdrop-blur-lg border-r border-gray-800 p-6 flex flex-col justify-between fixed h-full z-20`}
        >
          <div>
            {/* Topo com logo + botão ocultar */}
            <motion.div className="flex items-center justify-between mb-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
              >
                Eventry
              </motion.h1>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarVisible(false)}
                className="text-white hover:text-gray-300 p-1 rounded transition"
                title="Ocultar menu"
              >
                <ChevronLeft />
              </motion.button>
            </motion.div>

            {/* Perfil do usuário logado com animação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700 mb-8 hover:border-cyan-500/50 transition-colors"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm"
              >
                {getInitials(user.name)}
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-cyan-400">{user.role}</p>
              </div>
            </motion.div>

            {/* Navegação com efeitos de hover */}
            <nav className="space-y-2">
              {[
                { icon: <Event />, label: "Eventos", tab: 0 },
                { icon: <Group />, label: "Participantes", tab: 1 },
                { icon: <Assessment />, label: "Relatórios", tab: 2 },
                { icon: <Settings />, label: "Configurações", tab: 3 },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTab(item.tab)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                    tab === item.tab
                      ? "bg-gray-800 text-cyan-400"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Botão Sair com animação */}
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 transition group"
          >
            <ExitToApp />
            <span>Sair</span>
            <motion.span
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
            >
              <ArrowForward />
            </motion.span>
          </motion.button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
