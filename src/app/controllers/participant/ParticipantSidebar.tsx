import { motion } from "framer-motion";
import { Typography, Avatar, Tooltip } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { type TabType, type MenuItem } from "../../models/ParticipantTypes";

interface ParticipantSidebarProps {
  sidebarOpen: boolean;
  tab: TabType;
  menuItems: MenuItem[];
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

export function ParticipantSidebar({
  sidebarOpen,
  tab,
  menuItems,
  onTabChange,
  onLogout,
}: ParticipantSidebarProps) {
  return (
    <motion.aside
      initial={{ width: sidebarOpen ? 256 : 0 }}
      animate={{
        width: sidebarOpen ? 256 : 0,
        opacity: sidebarOpen ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-900 border-r border-gray-800 p-6 flex flex-col ${
        sidebarOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">
        Eventry
      </h1>

      {/* Perfil do Usuário */}
      <motion.div
        className="flex items-center gap-3 p-3 mb-6 bg-gray-800/50 rounded-lg border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Avatar className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600">
          JS
        </Avatar>
        <div>
          <Typography className="font-medium text-white">João Silva</Typography>
          <Typography className="text-xs text-cyan-400">
            Participante VIP
          </Typography>
        </div>
      </motion.div>

      <nav className="space-y-2 text-gray-300 flex-1">
        {menuItems.map((item) => (
          <Tooltip key={item.tab} title={item.label} placement="right" arrow>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(item.tab)}
              className={`flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-800 ${
                tab === item.tab && "bg-gray-800 text-cyan-400"
              }`}
              aria-current={tab === item.tab ? "page" : undefined}
            >
              {item.icon} {item.label}
            </motion.button>
          </Tooltip>
        ))}

        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
            <span
              className={`w-2 h-2 rounded-full ${
                navigator.onLine ? "bg-green-500" : "bg-rose-500"
              }`}
            ></span>
            {navigator.onLine ? "Online" : "Offline"}
          </div>

          <Tooltip title="Voltar para página inicial" placement="right" arrow>
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center gap-3 p-3 rounded-lg transition-all w-full hover:bg-gradient-to-r hover:from-rose-900/30 hover:to-rose-800/20 text-gray-300 hover:text-rose-400"
              aria-label="Sair da conta"
            >
              <ExitToApp
                fontSize="small"
                className="hover:scale-110 transition-transform"
              />
              <span>Sair</span>
            </motion.button>
          </Tooltip>
        </div>
      </nav>
    </motion.aside>
  );
}
