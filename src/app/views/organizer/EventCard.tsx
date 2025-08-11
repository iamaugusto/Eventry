import { motion } from "framer-motion";
import { Button } from "@mui/material";
import {
  Star,
  StarBorder,
  Share,
  Edit,
  Delete,
  CalendarToday,
  LocationOn,
  People,
  Image as ImageIcon,
  ArrowForward,
} from "@mui/icons-material";
import { type Event } from "../../models/Event";

interface EventCardProps {
  event: Event;
  toggleFeatured: (id: string) => void;
  handleDeleteEvent: (id: string) => void;
  formatDate: (dateString: string) => string;
}

export function EventCard({
  event,
  toggleFeatured,
  handleDeleteEvent,
  formatDate,
}: EventCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20 }}
      whileHover={{ y: -5 }}
      className={`relative rounded-xl overflow-hidden border ${
        event.featured ? "border-cyan-500/50" : "border-gray-700"
      } bg-gray-800/50 shadow-lg transition-all duration-300 group`}
    >
      {event.featured && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 left-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center z-10"
        >
          <Star className="mr-1" fontSize="small" />
          Destaque
        </motion.div>
      )}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleFeatured(event.id!)}
          className="p-1 bg-gray-800/80 rounded-full backdrop-blur-sm"
          title={event.featured ? "Remover destaque" : "Destacar evento"}
        >
          {event.featured ? (
            <Star className="text-yellow-400" />
          ) : (
            <StarBorder className="text-gray-400" />
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1 bg-gray-800/80 rounded-full backdrop-blur-sm"
          title="Compartilhar"
        >
          <Share className="text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1 bg-gray-800/80 rounded-full backdrop-blur-sm"
          title="Editar"
        >
          <Edit className="text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDeleteEvent(event.id!)}
          className="p-1 bg-gray-800/80 rounded-full backdrop-blur-sm"
          title="Excluir"
        >
          <Delete className="text-rose-400" />
        </motion.button>
      </div>
      <div className="h-40 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 flex items-center justify-center">
        {event.banner ? (
          <img
            src={event.banner}
            alt="Banner do evento"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-4">
            <ImageIcon className="text-4xl text-gray-500 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Sem banner</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 truncate">
          {event.title}
        </h3>
        <div className="flex items-center text-cyan-400 text-sm mb-2">
          <CalendarToday className="mr-1" fontSize="small" />
          <span>
            {formatDate(event.date)} • {event.time}
          </span>
        </div>
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <LocationOn className="mr-1" fontSize="small" />
          <span className="truncate">{event.location}</span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-2 mb-3">
          {event.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-400 text-sm">
            <People className="mr-1" fontSize="small" />
            <span>{event.capacity} participantes</span>
          </div>
          <Button
            size="small"
            className="text-cyan-400 hover:text-cyan-300"
            endIcon={<ArrowForward />}
          >
            Detalhes
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
