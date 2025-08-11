import { motion } from "framer-motion";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  type SelectChangeEvent,
} from "@mui/material";
import {
  Event,
  ChevronLeft,
  Title as TitleIcon,
  Description,
  CalendarToday,
  Schedule,
  LocationOn,
  People,
  Image as ImageIcon,
  Category as CategoryIcon,
  Visibility,
} from "@mui/icons-material";
import { type Event as EventType } from "../../models/Event";

interface EventFormDialogProps {
  open: boolean;
  onClose: () => void;
  newEvent: EventType;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitEvent: () => void;
  isLoading: boolean;
  isMobile: boolean;
  formatDate: (dateString: string) => string;
}

export function EventFormDialog({
  open,
  onClose,
  newEvent,
  handleInputChange,
  handleFileChange,
  handleSubmitEvent,
  isLoading,
  isMobile,
  formatDate,
}: EventFormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => !isLoading && onClose()}
      fullScreen={isMobile}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        component: motion.div,
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 },
        transition: { type: "spring", damping: 20, stiffness: 300 },
        className: "bg-gray-800 overflow-hidden",
      }}
    >
      <DialogTitle className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold py-4 px-6 flex items-center">
        <Event className="mr-2" />
        <span>Criar Novo Evento</span>
        <div className="ml-auto flex space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onClose}
              disabled={isLoading}
              className="text-white/80 hover:text-white !min-w-0 !p-1"
            >
              <ChevronLeft />
            </Button>
          </motion.div>
        </div>
      </DialogTitle>

      <DialogContent className="p-0 bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Formulário */}
          <motion.div
            className="p-6 lg:col-span-2 overflow-y-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-6">
              {/* Upload de Banner - Aprimorado */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative group"
              >
                <input
                  type="file"
                  id="banner-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="banner-upload" className="block cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative bg-gray-700/50 rounded-xl border-2 border-dashed border-gray-600 group-hover:border-cyan-400 transition-all h-48 overflow-hidden flex items-center justify-center"
                  >
                    {newEvent.banner ? (
                      <>
                        <img
                          src={newEvent.banner}
                          alt="Banner do evento"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800/90 text-white px-4 py-2 rounded-full flex items-center text-sm"
                          >
                            <ImageIcon className="mr-2" />
                            <span>Alterar imagem</span>
                          </motion.div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-gray-800/80 p-3 rounded-full mb-3"
                        >
                          <ImageIcon className="text-3xl" />
                        </motion.div>
                        <p className="font-medium">Adicionar banner</p>
                        <p className="text-xs mt-1 text-gray-500">
                          Arraste ou clique para fazer upload
                        </p>
                        <p className="text-xs text-gray-500">
                          Recomendado: 1200×400px
                        </p>
                      </div>
                    )}
                  </motion.div>
                </label>
              </motion.div>

              {/* Campos do formulário com alinhamento refinado */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <TextField
                    name="title"
                    label="Título do Evento"
                    variant="filled"
                    fullWidth
                    value={newEvent.title}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      className: "text-gray-400 pl-9",
                      style: { color: "#9ca3af" },
                    }}
                    InputProps={{
                      className:
                        "text-white bg-gray-700 rounded-lg hover:bg-gray-700/70 focus-within:bg-gray-700/80 transition-all pl-9",
                      style: {
                        color: "white",
                        paddingTop: "22px",
                        paddingLeft: "36px",
                      },
                      disableUnderline: true,
                    }}
                    placeholder="Ex: Tech Conference 2025"
                  />
                  <TitleIcon className="absolute left-3 top-9 text-gray-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <TextField
                    name="description"
                    label="Descrição"
                    variant="filled"
                    multiline
                    minRows={4}
                    fullWidth
                    value={newEvent.description}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      className: "text-gray-400 pl-9",
                      style: { color: "#9ca3af" },
                    }}
                    InputProps={{
                      className:
                        "text-white bg-gray-700 rounded-lg hover:bg-gray-700/70 focus-within:bg-gray-700/80 transition-all pl-9 pt-5",
                      style: {
                        color: "white",
                        paddingLeft: "36px",
                        paddingTop: "30px",
                      },
                      disableUnderline: true,
                    }}
                    placeholder="Descreva seu evento com detalhes..."
                  />
                  <Description className="absolute left-3 top-9 text-gray-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <TextField
                      name="date"
                      label="Data"
                      type="date"
                      variant="filled"
                      fullWidth
                      value={newEvent.date}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                        className: "text-gray-400 ml-9",
                        style: { color: "#9ca3af" },
                      }}
                      InputProps={{
                        className:
                          "text-white bg-gray-700 rounded-lg hover:bg-gray-700/70 focus-within:bg-gray-700/80 transition-all pl-9",
                        style: {
                          color: "white",
                          paddingLeft: "36px",
                        },
                        disableUnderline: true,
                      }}
                    />
                    <CalendarToday className="absolute left-3 top-9 text-gray-400" />
                  </div>

                  <div className="relative">
                    <TextField
                      name="time"
                      label="Hora"
                      type="time"
                      variant="filled"
                      fullWidth
                      value={newEvent.time}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                        className: "text-gray-400 ml-9",
                        style: { color: "#9ca3af" },
                      }}
                      InputProps={{
                        className:
                          "text-white bg-gray-700 rounded-lg hover:bg-gray-700/70 focus-within:bg-gray-700/80 transition-all pl-9",
                        style: {
                          color: "white",
                          paddingLeft: "36px",
                        },
                        disableUnderline: true,
                      }}
                    />
                    <Schedule className="absolute left-3 top-9 text-gray-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative">
                  <FormControl
                    fullWidth
                    variant="filled"
                    className="bg-gray-700 rounded-lg"
                  >
                    <InputLabel style={{ color: "#9ca3af" }} className="pl-9">
                      Categoria
                    </InputLabel>
                    <Select
                      name="category"
                      value={newEvent.category}
                      onChange={handleInputChange}
                      label="Categoria"
                      className="text-white pl-9"
                      style={{
                        color: "white",
                        backgroundColor: "#374151",
                        borderRadius: "0.5rem",
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            backgroundColor: "#1f2937",
                            color: "white",
                          },
                        },
                      }}
                      disableUnderline
                    >
                      <MenuItem value="Conferência">Conferência</MenuItem>
                      <MenuItem value="Workshop">Workshop</MenuItem>
                      <MenuItem value="Meetup">Meetup</MenuItem>
                      <MenuItem value="Show">Show</MenuItem>
                      <MenuItem value="Outro">Outro</MenuItem>
                    </Select>
                  </FormControl>
                  <CategoryIcon className="absolute left-3 top-9 text-gray-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <TextField
                    name="location"
                    label="Localização"
                    variant="filled"
                    fullWidth
                    value={newEvent.location}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      className: "text-gray-400 pl-9",
                      style: { color: "#9ca3af" },
                    }}
                    InputProps={{
                      className:
                        "text-white bg-gray-700 rounded-lg hover:bg-gray-700/70 focus-within:bg-gray-700/80 transition-all pl-9",
                      style: {
                        color: "white",
                        paddingLeft: "36px",
                      },
                      disableUnderline: true,
                    }}
                    placeholder="Ex: São Paulo Expo Exhibition & Convention Center"
                  />
                  <LocationOn className="absolute left-3 top-9 text-gray-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="relative">
                  <TextField
                    name="capacity"
                    label="Capacidade (número de participantes)"
                    type="number"
                    variant="filled"
                    fullWidth
                    value={newEvent.capacity}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      className: "text-gray-400 pl-9",
                      style: { color: "#9ca3af" },
                    }}
                    InputProps={{
                      className:
                        "text-white bg-gray-700 rounded-lg hover:bg-gray-700/70 focus-within:bg-gray-700/80 transition-all pl-9",
                      style: {
                        color: "white",
                        paddingLeft: "36px",
                      },
                      disableUnderline: true,
                    }}
                    placeholder="Ex: 10000"
                  />
                  <People className="absolute left-3 top-9 text-gray-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Preview - Mantido com pequenos refinamentos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block bg-gray-900/50 border-l border-gray-700 p-6 overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
              <Visibility className="text-cyan-400 mr-2" />
              Prévia do Evento
            </h3>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg transition-all duration-300"
            >
              {newEvent.banner ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={newEvent.banner}
                    alt="Banner preview"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 flex items-center justify-center">
                  <div className="text-center p-4">
                    <ImageIcon className="text-4xl text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Sem banner</p>
                  </div>
                </div>
              )}

              <div className="p-5">
                <h4 className="text-xl font-bold text-white mb-2 truncate">
                  {newEvent.title || "Título do Evento"}
                </h4>

                <div className="flex items-center text-cyan-400 mb-3">
                  <CalendarToday className="text-sm mr-2" />
                  <span className="text-sm">
                    {newEvent.date ? formatDate(newEvent.date) : "DD/MM/AAAA"} •{" "}
                    {newEvent.time || " HH:MM"}
                  </span>
                </div>

                <div className="flex items-center text-gray-400 mb-4">
                  <LocationOn className="text-sm mr-2" />
                  <span className="text-sm truncate">
                    {newEvent.location || "Local do evento"}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3 min-h-[60px]">
                  {newEvent.description ||
                    "Descrição do evento aparecerá aqui..."}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-400">
                    <People className="text-sm mr-1" />
                    <span className="text-sm">
                      {newEvent.capacity || "0"} participantes
                    </span>
                  </div>

                  <button className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </DialogContent>

      <DialogActions className="bg-gray-800/90 p-4 border-t border-gray-700 flex flex-col sm:flex-row gap-3">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto"
        >
          <Button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-all w-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            startIcon={<ChevronLeft />}
          >
            Voltar
          </Button>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg shadow-lg w-full sm:w-auto"
        >
          <Button
            onClick={handleSubmitEvent}
            disabled={isLoading || !newEvent.title}
            className="text-white px-6 py-3 w-full transition-all font-bold flex items-center justify-center"
            style={{ color: "white" }}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Event />
              )
            }
          >
            {isLoading ? "Publicando..." : "Publicar Evento"}
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  );
}
