import { motion } from "framer-motion";
import { Button, Modal, TextField, CircularProgress } from "@mui/material";
import { Settings, Event, People, Close } from "@mui/icons-material";
import { useState } from "react";
import type { FormEvent } from "react";

export function SettingsSection() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenProfileEdit = () => {
    setIsEditingProfile(true);
  };

  const handleCloseProfileEdit = () => {
    setIsEditingProfile(false);
  };

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulando uma requisição à API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    handleCloseProfileEdit();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Preferências (único modificado) */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-cyan-600/20 text-cyan-400">
              <Settings />
            </div>
            <h3 className="text-lg font-semibold text-white">Preferências</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Configure suas preferências de conta e notificações.
          </p>
          <Button
            variant="outlined"
            className="text-cyan-400 border-cyan-400/30 hover:border-cyan-400/50 hover:bg-cyan-400/10"
            onClick={handleOpenProfileEdit}
          >
            Editar
          </Button>
        </motion.div>

        {/* Cards de Eventos Padrão e Equipe permanecem EXATAMENTE iguais */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-purple-600/20 text-purple-400">
              <Event />
            </div>
            <h3 className="text-lg font-semibold text-white">Eventos Padrão</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Defina configurações padrão para novos eventos.
          </p>
          <Button
            variant="outlined"
            className="text-purple-400 border-purple-400/30 hover:border-purple-400/50 hover:bg-purple-400/10"
          >
            Editar
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-green-600/20 text-green-400">
              <People />
            </div>
            <h3 className="text-lg font-semibold text-white">Equipe</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Gerencie membros da equipe e permissões.
          </p>
          <Button
            variant="outlined"
            className="text-green-400 border-green-400/30 hover:border-green-400/50 hover:bg-green-400/10"
          >
            Editar
          </Button>
        </motion.div>
      </div>

      {/* Modal de Edição (novo) */}
      <Modal
        open={isEditingProfile}
        onClose={handleCloseProfileEdit}
        className="flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">
              Editar Preferências
            </h3>
            <button
              onClick={handleCloseProfileEdit}
              className="text-gray-400 hover:text-white"
            >
              <Close />
            </button>
          </div>

          <form onSubmit={handleProfileSubmit}>
            <div className="space-y-4 mb-6">
              <TextField
                fullWidth
                label="Notificações por Email"
                variant="outlined"
                className="[&_.MuiOutlinedInput-root]:text-white [&_.MuiInputLabel-root]:text-gray-400"
              />

              <TextField
                fullWidth
                label="Tema da Interface"
                variant="outlined"
                className="[&_.MuiOutlinedInput-root]:text-white [&_.MuiInputLabel-root]:text-gray-400"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                onClick={handleCloseProfileEdit}
                className="text-gray-400 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </motion.div>
      </Modal>
    </motion.div>
  );
}
