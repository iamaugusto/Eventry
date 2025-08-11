import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

interface LogoutConfirmModalProps {
  open: boolean;
  isLoggingOut: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  open,
  isLoggingOut,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "bg-gray-800 border border-cyan-500/20 rounded-xl",
      }}
      aria-labelledby="logout-modal-title"
    >
      <DialogTitle id="logout-modal-title" className="text-cyan-400 font-bold">
        Sair da conta?
      </DialogTitle>
      <DialogContent>
        <Typography className="text-gray-300">
          Você será redirecionado para a página inicial
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
          aria-label="Cancelar logout"
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoggingOut}
          className="bg-gradient-to-r from-rose-600 to-rose-500 text-white"
          startIcon={
            isLoggingOut ? <CircularProgress size={20} color="inherit" /> : null
          }
          aria-label="Confirmar logout"
        >
          {isLoggingOut ? "Saindo..." : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
