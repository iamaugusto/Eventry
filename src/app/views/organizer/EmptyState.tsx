import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Event, Add } from "@mui/icons-material";

interface EmptyStateProps {
  searchTerm: string;
  onCreateEvent: () => void;
}

export function EmptyState({ searchTerm, onCreateEvent }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full text-center py-10"
    >
      <div className="text-gray-500 mb-4">
        <Event className="text-4xl" />
      </div>
      <h3 className="text-xl font-medium text-gray-300 mb-2">
        Nenhum evento encontrado
      </h3>
      <p className="text-gray-500">
        {searchTerm
          ? "Nenhum evento corresponde à sua busca"
          : "Você ainda não criou nenhum evento"}
      </p>
      {!searchTerm && (
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Button
            variant="contained"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-500 !text-white"
            onClick={onCreateEvent}
            startIcon={<Add />}
          >
            Criar primeiro evento
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
