import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Avatar,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Skeleton,
  Switch,
} from "@mui/material";
import {
  QrCodeScanner,
  CheckCircle,
  ConfirmationNumber,
  Event,
  Discount,
  Person,
  Receipt,
  AccountBalanceWallet,
  RateReview,
  CalendarToday,
  Groups,
  Star,
  ExitToApp,
  SentimentDissatisfied,
  Menu,
  ChevronLeft,
} from "@mui/icons-material";
import { Toaster } from "react-hot-toast";

// Tipos TypeScript
type TabType = 0 | 1 | 2 | 3 | 4 | 5;
type RatingType = 0 | 1 | 2 | 3 | 4 | 5;

interface EventItem {
  time: string;
  title: string;
  active: boolean;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  tab: TabType;
}

interface EventCardProps {
  title: string;
  date: string;
  status: string;
  statusColor: string;
  children: React.ReactNode;
  loading?: boolean;
}

// Componente de Loading para Cards
const LoadingCard = () => (
  <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
    <CardContent>
      <div className="flex justify-between items-start">
        <div className="w-full">
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={24} />
        </div>
        <Skeleton variant="circular" width={40} height={24} />
      </div>
      <Divider className="my-4 bg-gray-700" />
      <Skeleton
        variant="rectangular"
        height={100}
        className="mb-4 rounded-lg"
      />
      <div className="flex justify-between">
        <Skeleton variant="text" width="40%" height={36} />
        <Skeleton variant="text" width="30%" height={36} />
      </div>
    </CardContent>
  </Card>
);

// Componente Timeline extraído
const EventTimeline = ({ items }: { items: EventItem[] }) => (
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

// Componente EventCard extraído com melhorias de UX
const EventCard = memo(
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

export default function ParticipantPage() {
  const [tab, setTab] = useState<TabType>(0);
  const [ticketUsed, setTicketUsed] = useState<boolean>(false);
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
  const [rating, setRating] = useState<RatingType>(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleTicketUse = () => {
    setTicketUsed(true);
    showFeedback("Ingresso marcado como utilizado!", "success");
  };

  const showFeedback = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleRatingSubmit = () => {
    setShowRatingModal(false);
    showFeedback("Obrigado por sua avaliação!", "success");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    showFeedback(`Modo ${newMode ? "escuro" : "claro"} ativado`, "success");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems: MenuItem[] = [
    { icon: <Event fontSize="small" />, label: "Meus Eventos", tab: 0 },
    {
      icon: <ConfirmationNumber fontSize="small" />,
      label: "Ingressos",
      tab: 1,
    },
    { icon: <QrCodeScanner fontSize="small" />, label: "Check-in", tab: 2 },
    {
      icon: <AccountBalanceWallet fontSize="small" />,
      label: "Carteira",
      tab: 3,
    },
    { icon: <Groups fontSize="small" />, label: "Rede Social", tab: 4 },
    { icon: <Person fontSize="small" />, label: "Minha Conta", tab: 5 },
  ];

  // Componente Sidebar extraído
  const Sidebar = () => (
    <motion.aside
      initial={{ width: sidebarOpen ? 256 : 0 }}
      animate={{
        width: sidebarOpen ? 256 : 0,
        opacity: sidebarOpen ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-900 border-r border-gray-800 p-6 flex flex-col ${
        sidebarOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">
        Eventry
      </h1>

      {/* Perfil do Usuário */}
      <motion.div
        className="flex items-center gap-3 p-3 mb-6 bg-gray-800/50 rounded-lg border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Avatar className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600">
          JS
        </Avatar>
        <div>
          <Typography className="font-medium text-white">João Silva</Typography>
          <Typography className="text-xs text-cyan-400">
            Participante VIP
          </Typography>
        </div>
      </motion.div>

      <nav className="space-y-2 text-gray-300 flex-1">
        {menuItems.map((item) => (
          <Tooltip key={item.tab} title={item.label} placement="right" arrow>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTab(item.tab)}
              className={`flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-800 ${
                tab === item.tab && "bg-gray-800 text-cyan-400"
              }`}
              aria-current={tab === item.tab ? "page" : undefined}
            >
              {item.icon} {item.label}
            </motion.button>
          </Tooltip>
        ))}

        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
            <span
              className={`w-2 h-2 rounded-full ${
                navigator.onLine ? "bg-green-500" : "bg-rose-500"
              }`}
            ></span>
            {navigator.onLine ? "Online" : "Offline"}
          </div>

          <Tooltip title="Voltar para página inicial" placement="right" arrow>
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-3 p-3 rounded-lg transition-all w-full hover:bg-gradient-to-r hover:from-rose-900/30 hover:to-rose-800/20 text-gray-300 hover:text-rose-400"
              aria-label="Sair da conta"
            >
              <ExitToApp
                fontSize="small"
                className="hover:scale-110 transition-transform"
              />
              <span>Sair</span>
            </motion.button>
          </Tooltip>
        </div>
      </nav>
    </motion.aside>
  );

  // Componente RatingModal extraído
  const RatingModal = () => (
    <Dialog
      open={showRatingModal}
      onClose={() => setShowRatingModal(false)}
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
              onClick={() => setRating(star as RatingType)}
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
          onClick={() => setShowRatingModal(false)}
          className="text-gray-400"
          aria-label="Cancelar avaliação"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleRatingSubmit}
          className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
          aria-label="Enviar avaliação"
        >
          Enviar Avaliação
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Componente LogoutConfirmModal extraído
  const LogoutConfirmModal = () => (
    <Dialog
      open={showLogoutConfirm}
      onClose={() => setShowLogoutConfirm(false)}
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
          onClick={() => setShowLogoutConfirm(false)}
          className="text-gray-400 hover:text-white"
          aria-label="Cancelar logout"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleLogout}
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

  // Componente EmptyState para quando não há dados
  const EmptyState = ({
    icon,
    message,
  }: {
    icon: React.ReactNode;
    message: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-gray-400"
    >
      {icon}
      <Typography className="mt-4">{message}</Typography>
    </motion.div>
  );

  // Botão de Toggle para a Sidebar
  const SidebarToggleButton = () => (
    <motion.div
      className={`absolute top-4 ${
        sidebarOpen ? "left-[17rem]" : "left-4"
      } z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Tooltip title={sidebarOpen ? "Ocultar menu" : "Mostrar menu"}>
        <IconButton
          onClick={toggleSidebar}
          className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 border border-gray-700"
          aria-label={sidebarOpen ? "Ocultar menu" : "Mostrar menu"}
        >
          {sidebarOpen ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Tooltip>
    </motion.div>
  );

  return (
    <section className="min-h-screen flex bg-gray-950 relative">
      <Toaster position="top-right" />

      <Sidebar />
      <SidebarToggleButton />

      {/* Conteúdo Principal com ajuste para sidebar recolhida */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          sidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-8 shadow-xl backdrop-blur-lg h-full"
          >
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton variant="text" width="30%" height={48} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LoadingCard />
                  <LoadingCard />
                </div>
              </div>
            ) : error ? (
              <EmptyState
                icon={<SentimentDissatisfied style={{ fontSize: "4rem" }} />}
                message="Ocorreu um erro ao carregar os dados. Por favor, tente novamente."
              />
            ) : (
              <>
                {/* Conteúdo das abas */}
                {tab === 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Eventos Inscritos
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EventCard
                        title="Festival de Música"
                        date="15/12/2023 • 20:00"
                        status="Confirmado"
                        statusColor="bg-green-500/20 text-green-400"
                      >
                        <EventTimeline
                          items={[
                            {
                              time: "18:00",
                              title: "Credenciamento",
                              active: true,
                            },
                            { time: "19:30", title: "Abertura", active: false },
                            {
                              time: "20:00",
                              title: "Show Principal",
                              active: false,
                            },
                          ]}
                        />
                        <div className="flex justify-between items-center mt-4">
                          <Button
                            size="small"
                            className="text-cyan-400 hover:bg-cyan-500/10"
                            startIcon={<CalendarToday fontSize="small" />}
                          >
                            Adicionar ao Calendário
                          </Button>
                          <Button
                            size="small"
                            className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                          >
                            Detalhes
                          </Button>
                        </div>
                      </EventCard>

                      <EventCard
                        title="Workshop de Tecnologia"
                        date="20/01/2024 • 09:00"
                        status="Pendente"
                        statusColor="bg-yellow-500/20 text-yellow-400"
                      >
                        <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center text-gray-500 border border-gray-700">
                          <Typography variant="body2">Mapa do Local</Typography>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography variant="body2" className="text-gray-300">
                            Ingresso: Meia-entrada
                          </Typography>
                          <Button
                            size="small"
                            className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                          >
                            Comprar
                          </Button>
                        </div>
                      </EventCard>
                    </div>
                  </div>
                )}

                {tab === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Meus Ingressos
                    </h2>

                    <Card className="bg-gray-800/50 border border-gray-700 rounded-xl mb-6">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <Typography
                              variant="h6"
                              className="text-white font-semibold"
                            >
                              Festival de Música - VIP
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-gray-400 mt-1"
                            >
                              Código: EVT-789456 | Validade: 15/12/2023
                            </Typography>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="contained"
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                              startIcon={<Receipt />}
                            >
                              Recibo
                            </Button>
                            <Button
                              variant="outlined"
                              className="text-cyan-400 border-cyan-400/50 hover:border-cyan-400"
                              startIcon={<Discount />}
                            >
                              Cupom
                            </Button>
                          </div>
                        </div>

                        <Divider className="my-4 bg-gray-700" />

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <CheckCircle
                              color={ticketUsed ? "success" : "disabled"}
                            />
                            <Typography
                              variant="body2"
                              className={
                                ticketUsed ? "text-green-400" : "text-gray-400"
                              }
                            >
                              {ticketUsed
                                ? "Utilizado em 10/12/2023"
                                : "Disponível para uso"}
                            </Typography>
                          </div>
                          {!ticketUsed && (
                            <Button
                              size="small"
                              className="text-rose-400 hover:bg-rose-500/10"
                              onClick={handleTicketUse}
                            >
                              Marcar como utilizado
                            </Button>
                          )}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button
                            variant="outlined"
                            className="border-amber-400 text-amber-400 hover:bg-amber-500/10"
                            startIcon={<RateReview />}
                            onClick={() => setShowRatingModal(true)}
                          >
                            Avaliar Evento
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {tab === 5 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Minha Conta
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Seção de Informações Pessoais */}
                      <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
                        <CardContent>
                          <Typography
                            variant="h6"
                            className="text-white font-semibold mb-4"
                          >
                            Informações Pessoais
                          </Typography>

                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600">
                                JS
                              </Avatar>
                              <div>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className="text-cyan-400 border-cyan-400/50 hover:border-cyan-400"
                                >
                                  Alterar Foto
                                </Button>
                                <Typography
                                  variant="caption"
                                  className="text-gray-400 block mt-1"
                                >
                                  JPG, GIF ou PNG. Máx. 5MB
                                </Typography>
                              </div>
                            </div>

                            <TextField
                              fullWidth
                              label="Nome Completo"
                              defaultValue="João Silva"
                              variant="outlined"
                              InputProps={{
                                className:
                                  "text-white bg-gray-800/30 rounded-lg",
                              }}
                              InputLabelProps={{
                                className: "text-gray-400",
                              }}
                            />

                            <TextField
                              fullWidth
                              label="Email"
                              defaultValue="joao@exemplo.com"
                              variant="outlined"
                              InputProps={{
                                className:
                                  "text-white bg-gray-800/30 rounded-lg",
                              }}
                              InputLabelProps={{
                                className: "text-gray-400",
                              }}
                            />

                            <TextField
                              fullWidth
                              label="Telefone"
                              defaultValue="(11) 98765-4321"
                              variant="outlined"
                              InputProps={{
                                className:
                                  "text-white bg-gray-800/30 rounded-lg",
                              }}
                              InputLabelProps={{
                                className: "text-gray-400",
                              }}
                            />

                            <div className="flex justify-end mt-2">
                              <Button
                                variant="contained"
                                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                              >
                                Salvar Alterações
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção de Segurança */}
                      <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
                        <CardContent>
                          <Typography
                            variant="h6"
                            className="text-white font-semibold mb-4"
                          >
                            Segurança
                          </Typography>

                          <div className="space-y-4">
                            <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                              <Typography
                                variant="subtitle2"
                                className="text-white"
                              >
                                Senha
                              </Typography>
                              <Typography
                                variant="body2"
                                className="text-gray-400"
                              >
                                *********
                              </Typography>
                              <Button
                                size="small"
                                className="text-cyan-400 hover:bg-cyan-500/10 mt-2"
                              >
                                Alterar Senha
                              </Button>
                            </div>

                            <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                              <Typography
                                variant="subtitle2"
                                className="text-white"
                              >
                                Autenticação de Dois Fatores
                              </Typography>
                              <Typography
                                variant="body2"
                                className="text-gray-400"
                              >
                                Desativado
                              </Typography>
                              <Button
                                size="small"
                                className="text-purple-400 hover:bg-purple-500/10 mt-2"
                              >
                                Ativar 2FA
                              </Button>
                            </div>

                            <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                              <Typography
                                variant="subtitle2"
                                className="text-white"
                              >
                                Dispositivos Conectados
                              </Typography>
                              <Typography
                                variant="body2"
                                className="text-gray-400"
                              >
                                3 dispositivos
                              </Typography>
                              <Button
                                size="small"
                                className="text-amber-400 hover:bg-amber-500/10 mt-2"
                              >
                                Gerenciar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção de Preferências */}
                      <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
                        <CardContent>
                          <Typography
                            variant="h6"
                            className="text-white font-semibold mb-4"
                          >
                            Preferências
                          </Typography>

                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                              <div>
                                <Typography
                                  variant="subtitle2"
                                  className="text-white"
                                >
                                  Notificações por Email
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="text-gray-400"
                                >
                                  Receber novidades e promoções
                                </Typography>
                              </div>
                              <Switch color="primary" defaultChecked />
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                              <div>
                                <Typography
                                  variant="subtitle2"
                                  className="text-white"
                                >
                                  Notificações por Push
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="text-gray-400"
                                >
                                  Alertas importantes
                                </Typography>
                              </div>
                              <Switch color="primary" defaultChecked />
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                              <div>
                                <Typography
                                  variant="subtitle2"
                                  className="text-white"
                                >
                                  Modo Escuro
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="text-gray-400"
                                >
                                  Tema escuro para melhor visualização
                                </Typography>
                              </div>
                              <Switch
                                color="primary"
                                checked={darkMode}
                                onChange={toggleDarkMode}
                              />
                            </div>

                            <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                              <Typography
                                variant="subtitle2"
                                className="text-white mb-2"
                              >
                                Idioma
                              </Typography>
                              <TextField
                                select
                                fullWidth
                                defaultValue="pt"
                                variant="outlined"
                                InputProps={{
                                  className:
                                    "text-white bg-gray-800/30 rounded-lg",
                                }}
                              >
                                <option
                                  value="pt"
                                  className="bg-gray-800 text-white"
                                >
                                  Português
                                </option>
                                <option
                                  value="en"
                                  className="bg-gray-800 text-white"
                                >
                                  English
                                </option>
                                <option
                                  value="es"
                                  className="bg-gray-800 text-white"
                                >
                                  Español
                                </option>
                              </TextField>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Seção de Conta Premium */}
                    <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-cyan-400/20 rounded-xl mt-6">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <Typography
                              variant="h6"
                              className="text-white font-semibold"
                            >
                              Conta Premium
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-cyan-400"
                            >
                              Benefícios exclusivos • Expira em 15/12/2023
                            </Typography>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outlined"
                              className="text-white border-white/50 hover:border-white"
                            >
                              Gerenciar Assinatura
                            </Button>
                            <Button
                              variant="contained"
                              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                            >
                              Renovar Premium
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção de Ações Perigosas */}
                    <Card className="bg-gray-800/50 border border-rose-500/20 rounded-xl mt-6">
                      <CardContent className="p-6">
                        <Typography
                          variant="h6"
                          className="text-white font-semibold mb-2"
                        >
                          Zona de Perigo
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-gray-400 mb-4"
                        >
                          Ações nesta seção são irreversíveis
                        </Typography>

                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outlined"
                            className="text-rose-400 border-rose-400/50 hover:border-rose-400"
                          >
                            Exportar Meus Dados
                          </Button>
                          <Button
                            variant="outlined"
                            className="text-rose-400 border-rose-400/50 hover:border-rose-400"
                          >
                            Desativar Conta Temporariamente
                          </Button>
                          <Button
                            variant="contained"
                            className="bg-gradient-to-r from-rose-600 to-rose-700 text-white"
                          >
                            Excluir Minha Conta Permanentemente
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <RatingModal />
      <LogoutConfirmModal />

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            className="mb-4"
          >
            {snackbarMessage}
          </Alert>
        </motion.div>
      </Snackbar>
    </section>
  );
}
