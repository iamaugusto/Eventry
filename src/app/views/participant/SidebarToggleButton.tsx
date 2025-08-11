import { motion } from "framer-motion";
import { IconButton, Tooltip } from "@mui/material";
import { Menu, ChevronLeft } from "@mui/icons-material";

interface SidebarToggleButtonProps {
  sidebarOpen: boolean;
  onToggle: () => void;
}

export function SidebarToggleButton({
  sidebarOpen,
  onToggle,
}: SidebarToggleButtonProps) {
  return (
    <motion.div
      className={`absolute top-4 ${
        sidebarOpen ? "left-[17rem]" : "left-4"
      } z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Tooltip title={sidebarOpen ? "Ocultar menu" : "Mostrar menu"}>
        <IconButton
          onClick={onToggle}
          className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 border border-gray-700"
          aria-label={sidebarOpen ? "Ocultar menu" : "Mostrar menu"}
        >
          {sidebarOpen ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Tooltip>
    </motion.div>
  );
}
