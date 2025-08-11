import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { type RatingType } from "../../models/ParticipantTypes";

interface RatingModalProps {
  open: boolean;
  rating: RatingType;
  onClose: () => void;
  onRatingChange: (rating: RatingType) => void;
  onSubmit: () => void;
}

export function RatingModal({
  open,
  rating,
  onClose,
  onRatingChange,
  onSubmit,
}: RatingModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "bg-gray-800 text-white",
      }}
      aria-labelledby="rating-modal-title"
      aria-describedby="rating-modal-description"
    >
      <DialogTitle id="rating-modal-title" className="border-b border-gray-700">
        Avaliar Festival de Música
      </DialogTitle>
      <DialogContent className="pt-6">
        <div className="flex justify-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
              key={star}
              onClick={() => onRatingChange(star as RatingType)}
              aria-label={`Avaliar com ${star} estrela${star > 1 ? "s" : ""}`}
            >
              <Star
                className={`${
                  star <= rating ? "text-amber-400" : "text-gray-500"
                } transition-colors`}
                style={{ fontSize: star === rating ? "2rem" : "1.5rem" }}
              />
            </IconButton>
          ))}
        </div>
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Conte sua experiência..."
          className="bg-gray-700/50 text-white rounded-lg"
          aria-label="Comentário sobre o evento"
        />
      </DialogContent>
      <DialogActions className="border-t border-gray-700">
        <Button
          onClick={onClose}
          className="text-gray-400"
          aria-label="Cancelar avaliação"
        >
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
          aria-label="Enviar avaliação"
        >
          Enviar Avaliação
        </Button>
      </DialogActions>
    </Dialog>
  );
}
