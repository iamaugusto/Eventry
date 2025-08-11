import { memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { type EventCardProps } from "../../models/ParticipantTypes";
import { LoadingCard } from "./LoadingCard";

export const EventCard = memo(
  ({
    title,
    date,
    status,
    statusColor,
    children,
    loading = false,
  }: EventCardProps) => {
    if (loading) return <LoadingCard />;

    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card
          className="bg-gray-800/50 border border-gray-700 rounded-xl hover:border-cyan-400/30 transition-colors"
          aria-labelledby={`event-${title
            .replace(/\s+/g, "-")
            .toLowerCase()}-title`}
        >
          <CardContent>
            <div className="flex justify-between items-start">
              <div>
                <Typography
                  id={`event-${title.replace(/\s+/g, "-").toLowerCase()}-title`}
                  variant="h6"
                  className="text-white font-semibold"
                >
                  {title}
                </Typography>
                <Typography variant="body2" className="text-gray-400 mt-1">
                  {date}
                </Typography>
              </div>
              <span
                className={`${statusColor} text-xs px-2 py-1 rounded-full transition-opacity hover:opacity-90`}
                aria-label={`Status: ${status}`}
              >
                {status}
              </span>
            </div>
            <Divider className="my-4 bg-gray-700" />
            {children}
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);
