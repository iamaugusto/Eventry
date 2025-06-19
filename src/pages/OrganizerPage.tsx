import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  type SelectChangeEvent,
} from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Event,
  Group,
  Assessment,
  ExitToApp,
  ChevronLeft,
  ChevronRight,
  Title as TitleIcon,
  Description,
  CalendarToday,
  Schedule,
  LocationOn,
  People,
  Image as ImageIcon,
  ConfirmationNumber,
  Visibility,
  Category as CategoryIcon,
  CheckCircle,
  Close,
  ArrowForward,
  Add,
  Search,
  FilterList,
  MoreVert,
  Star,
  StarBorder,
  Share,
  Edit,
  Delete,
} from "@mui/icons-material";

interface Event {
  id?: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  banner: string | null;
  featured?: boolean;
}

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const generateId = () => Math.random().toString(36).substring(2, 11);

export default function OrganizerPage() {
  const [tab, setTab] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    description: "",
    date: "",
    time: "",
    category: "",
    location: "",
    capacity: "",
    banner: null,
  });
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarVisible(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load sample events
  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: generateId(),
        title: "Tech Conference 2025",
        description: "A maior conferência de tecnologia da América Latina",
        date: "2025-05-15",
        time: "09:00",
        category: "Conferência",
        location: "São Paulo Expo",
        capacity: "5000",
        banner: null,
        featured: true,
      },
      {
        id: generateId(),
        title: "Workshop de React Avançado",
        description: "Aprenda técnicas avançadas de React com especialistas",
        date: "2025-06-20",
        time: "14:00",
        category: "Workshop",
        location: "Online",
        capacity: "100",
        banner: null,
      },
    ];
    setEvents(sampleEvents);
  }, []);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewEvent((prev) => ({
          ...prev,
          banner: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmitEvent = () => {
    setIsLoading(true);

    setTimeout(() => {
      const eventWithId = { ...newEvent, id: generateId() };
      setEvents((prev) => [...prev, eventWithId]);
      setIsLoading(false);
      setOpenEventDialog(false);

      toast.success(
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <ConfirmationNumber className="text-green-400" />
          <span>Evento criado com sucesso!</span>
        </motion.div>,
        {
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "12px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
        }
      );

      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        category: "",
        location: "",
        capacity: "",
        banner: null,
      });
    }, 1500);
  };

  const handleDeleteEvent = (id: string) => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-gray-800 border border-rose-500/30 shadow-lg rounded-xl p-4 flex items-center space-x-3 transition-all duration-300`}
        >
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-2 rounded-full">
            <Delete className="text-white" />
          </div>
          <div>
            <p className="font-medium text-white">Evento removido!</p>
            <p className="text-sm text-gray-400">
              O evento foi excluído com sucesso
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <Close fontSize="small" />
          </button>
        </motion.div>
      ),
      {
        duration: 2500,
        position: "top-right",
      }
    );

    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, featured: !event.featured } : event
      )
    );
  };

  const handleLogout = () => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-gray-800 border border-cyan-500/30 shadow-lg rounded-xl p-4 flex items-center space-x-3 transition-all duration-300`}
        >
          <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-2 rounded-full">
            <CheckCircle className="text-white" />
          </div>
          <div>
            <p className="font-medium text-white">Logout realizado!</p>
            <p className="text-sm text-gray-400">
              Você saiu da sua conta com sucesso
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <Close fontSize="small" />
          </button>
        </motion.div>
      ),
      {
        duration: 2500,
        position: "top-right",
      }
    );

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const user = {
    name: "Thales Augusto",
    role: "Organizador",
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen flex bg-gray-950 relative overflow-hidden">
      {/* Efeito de partículas de fundo aprimorado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: ["0%", `${Math.random() * 100}%`],
              y: ["0%", `${Math.random() * 100}%`],
              rotate: [0, Math.random() * 360],
              transition: {
                duration: Math.random() * 50 + 30,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              },
            }}
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Toaster personalizado */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #374151",
            padding: "0px",
            background: "#1f2937",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          },
        }}
      />

      {/* Sidebar com mais animações */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`w-60 bg-gray-900/95 backdrop-blur-lg border-r border-gray-800 p-6 flex flex-col justify-between fixed h-full z-20`}
          >
            <div>
              {/* Topo com logo + botão ocultar */}
              <motion.div className="flex items-center justify-between mb-6">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                >
                  Eventry
                </motion.h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSidebarVisible(false)}
                  className="text-white hover:text-gray-300 p-1 rounded transition"
                  title="Ocultar menu"
                >
                  <ChevronLeft />
                </motion.button>
              </motion.div>

              {/* Perfil do usuário logado com animação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700 mb-8 hover:border-cyan-500/50 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm"
                >
                  {getInitials(user.name)}
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-cyan-400">{user.role}</p>
                </div>
              </motion.div>

              {/* Navegação com efeitos de hover */}
              <nav className="space-y-2">
                {[
                  { icon: <Event />, label: "Eventos", tab: 0 },
                  { icon: <Group />, label: "Participantes", tab: 1 },
                  { icon: <Assessment />, label: "Relatórios", tab: 2 },
                  { icon: <Settings />, label: "Configurações", tab: 3 },
                ].map((item) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTab(item.tab)}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                      tab === item.tab
                        ? "bg-gray-800 text-cyan-400"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Botão Sair com animação */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 transition group"
            >
              <ExitToApp />
              <span>Sair</span>
              <motion.span
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
              >
                <ArrowForward />
              </motion.span>
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Botão para mostrar sidebar quando oculta */}
      {!sidebarVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarVisible(true)}
          className="fixed top-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-all"
          title="Mostrar menu"
        >
          <ChevronRight />
        </motion.button>
      )}

      {/* Conteúdo principal com animação de entrada */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`flex-1 transition-all duration-300 ${
          sidebarVisible ? "ml-60" : "ml-0"
        } p-4 md:p-10 relative z-10`}
      >
        <motion.div
          layout
          className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          {tab === 0 && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-white"
                >
                  Seus Eventos
                </motion.h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative flex-1"
                  >
                    <TextField
                      placeholder="Buscar eventos..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <Search className="text-gray-400 mr-2" />
                        ),
                        className:
                          "text-white bg-gray-800 border-gray-700 rounded-lg",
                      }}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="contained"
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-500 !text-white transition-all shadow-lg"
                      onClick={() => setOpenEventDialog(true)}
                      startIcon={<Add />}
                    >
                      Novo Evento
                    </Button>
                  </motion.div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 mb-6"
              >
                Gerencie seus eventos existentes ou crie novos.
              </motion.p>

              {/* Lista de eventos com animações */}
              <LayoutGroup>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ type: "spring", damping: 20 }}
                          whileHover={{ y: -5 }}
                          className={`relative rounded-xl overflow-hidden border ${
                            event.featured
                              ? "border-cyan-500/50"
                              : "border-gray-700"
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
                              title={
                                event.featured
                                  ? "Remover destaque"
                                  : "Destacar evento"
                              }
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
                                <p className="text-gray-500 text-sm">
                                  Sem banner
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-white mb-1 truncate">
                              {event.title}
                            </h3>
                            <div className="flex items-center text-cyan-400 text-sm mb-2">
                              <CalendarToday
                                className="mr-1"
                                fontSize="small"
                              />
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
                      ))
                    ) : (
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
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="mt-6"
                          >
                            <Button
                              variant="contained"
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-500 !text-white"
                              onClick={() => setOpenEventDialog(true)}
                              startIcon={<Add />}
                            >
                              Criar primeiro evento
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            </div>
          )}

          {tab === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Lista de Participantes
              </h2>
              <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="relative flex-1 max-w-md">
                    <TextField
                      placeholder="Buscar participantes..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <Search className="text-gray-400 mr-2" />
                        ),
                        className:
                          "text-white bg-gray-700 border-gray-600 rounded-lg",
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <FilterList fontSize="small" />
                    <span>Filtrar</span>
                  </motion.button>
                </div>
                <table className="w-full text-sm text-gray-200">
                  <thead className="bg-gray-800 text-cyan-400">
                    <tr>
                      <th className="text-left p-3">Nome</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Evento</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-right p-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        nome: "João Silva",
                        email: "joao@example.com",
                        evento: "Tech Conference 2025",
                        status: "Pago",
                      },
                      {
                        nome: "Maria Oliveira",
                        email: "maria@example.com",
                        evento: "Workshop de React",
                        status: "Pendente",
                      },
                      {
                        nome: "Lucas Pereira",
                        email: "lucas@example.com",
                        evento: "Tech Conference 2025",
                        status: "Cancelado",
                      },
                    ].map((item, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="odd:bg-gray-800 even:bg-gray-900 hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="p-3">{item.nome}</td>
                        <td className="p-3">{item.email}</td>
                        <td className="p-3">{item.evento}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              item.status === "Pago"
                                ? "bg-green-600/30 text-green-400"
                                : item.status === "Pendente"
                                ? "bg-yellow-600/30 text-yellow-400"
                                : "bg-rose-600/30 text-rose-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <MoreVert fontSize="small" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Relatórios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                    Vendas Mensais
                  </h3>
                  <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-500">
                    Gráfico de vendas
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">
                    Participação por Evento
                  </h3>
                  <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-500">
                    Gráfico de participação
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg md:col-span-2"
                >
                  <h3 className="text-lg font-semibold text-green-400 mb-4">
                    Comparativo Anual
                  </h3>
                  <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center text-gray-500">
                    Gráfico comparativo
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {tab === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Configurações
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-cyan-600/20 text-cyan-400">
                      <Settings />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Preferências
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Configure suas preferências de conta e notificações.
                  </p>
                  <Button
                    variant="outlined"
                    className="text-cyan-400 border-cyan-400/30 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                  >
                    Editar
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-purple-600/20 text-purple-400">
                      <Event />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Eventos Padrão
                    </h3>
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
            </motion.div>
          )}
        </motion.div>
      </motion.main>

      {/* Diálogo para criação de novo evento */}
      <Dialog
        open={openEventDialog}
        onClose={() => !isLoading && setOpenEventDialog(false)}
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
                onClick={() => setOpenEventDialog(false)}
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
                  <label
                    htmlFor="banner-upload"
                    className="block cursor-pointer"
                  >
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
                      {newEvent.date ? formatDate(newEvent.date) : "DD/MM/AAAA"}{" "}
                      • {newEvent.time || " HH:MM"}
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
              onClick={() => setOpenEventDialog(false)}
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
    </section>
  );
}
