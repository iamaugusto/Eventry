import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { type EventItem } from "../../models/ParticipantTypes";

interface EventTimelineProps {
  items: EventItem[];
}

export function EventTimeline({ items }: EventTimelineProps) {
  return (
    <div className="mt-4">
      <Typography
        variant="subtitle2"
        className="text-cyan-300 mb-2 flex items-center"
      >
        Cronograma:
      </Typography>
      <div className="space-y-2 pl-4 border-l border-cyan-400/30">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`absolute -left-4 top-1 w-2 h-2 rounded-full ${
                item.active
                  ? "bg-cyan-400 ring-2 ring-cyan-400/30"
                  : "bg-gray-600"
              }`}
            />
            <Typography
              variant="body2"
              className={item.active ? "text-cyan-400" : "text-gray-400"}
            >
              {item.time} • {item.title}
            </Typography>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
