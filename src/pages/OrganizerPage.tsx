import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Button, TextField } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Add, Search } from "@mui/icons-material";
import { OrganizerSidebar } from "../app/controllers/organizer/OrganizerSidebar";
import { EventCard } from "../app/views/organizer/EventCard";
import { EventFormDialog } from "../app/controllers/organizer/EventFormDialog";
import { ParticipantsTable } from "../app/views/organizer/ParticipantsTable";
import { ReportsSection } from "../app/views/organizer/ReportsSection";
import { SettingsSection } from "../app/views/organizer/SettingsSection";
import { BackgroundParticles } from "../app/views/organizer/BackgroundParticles";
import { EmptyState } from "../app/views/organizer/EmptyState";
import { type Event } from "../app/models/Event";
import { type Participant } from "../app/models/Participant";

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
      | { target: { name: string; value: string } }
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
            <span className="text-white">🗑️</span>
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
            ✕
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
            <span className="text-white">✓</span>
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
            ✕
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

  const sampleParticipants: Participant[] = [
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
  ];

  return (
    <section className="min-h-screen flex bg-gray-950 relative overflow-hidden">
      {/* Efeito de partículas de fundo aprimorado */}
      <BackgroundParticles />

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
      <OrganizerSidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        tab={tab}
        setTab={setTab}
        handleLogout={handleLogout}
        user={user}
        getInitials={getInitials}
      />

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
                        sx: {
                          color: "white", // Texto branco
                          "& .MuiOutlinedInput-input": {
                            color: "white", // Garante texto branco no input
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#374151", // Mantém borda cinza escuro (gray-700)
                          },
                          backgroundColor: "#1f2937", // Mantém bg-gray-800
                          borderRadius: "0.5rem", // rounded-lg
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4b5563", // Efeito hover na borda
                          },
                        },
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
                        <EventCard
                          key={event.id}
                          event={event}
                          toggleFeatured={toggleFeatured}
                          handleDeleteEvent={handleDeleteEvent}
                          formatDate={formatDate}
                        />
                      ))
                    ) : (
                      <EmptyState
                        searchTerm={searchTerm}
                        onCreateEvent={() => setOpenEventDialog(true)}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            </div>
          )}

          {tab === 1 && <ParticipantsTable participants={sampleParticipants} />}

          {tab === 2 && <ReportsSection />}

          {tab === 3 && <SettingsSection />}
        </motion.div>
      </motion.main>

      {/* Diálogo para criação de novo evento */}
      <EventFormDialog
        open={openEventDialog}
        onClose={() => setOpenEventDialog(false)}
        newEvent={newEvent}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmitEvent={handleSubmitEvent}
        isLoading={isLoading}
        isMobile={isMobile}
        formatDate={formatDate}
      />
    </section>
  );
}
