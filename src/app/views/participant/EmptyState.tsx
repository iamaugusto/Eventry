import { motion } from "framer-motion";
import { Typography } from "@mui/material";

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

export function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-gray-400"
    >
      {icon}
      <Typography className="mt-4">{message}</Typography>
    </motion.div>
  );
}
