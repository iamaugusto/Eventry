import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepItem: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  const isEven = index % 2 === 0;
  const ref = React.useRef(null);
  const isVisible = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative mb-10 group"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Ponto central da linha do tempo */}
      <div className="absolute left-1/2 top-5 -ml-2 w-3.5 h-3.5 rounded-full bg-white shadow-cyan-400/50 shadow-sm z-20 group-hover:scale-110 transition duration-300">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-70 animate-spin-slow [animation-duration:5s] blur-sm"></div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4">
        {/* Ícone */}
        <div
          className={`flex ${
            isEven ? "md:justify-end md:pr-6" : "md:justify-start md:pl-6"
          } ${isEven ? "md:order-1" : "md:order-2"}`}
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/20 rotate-45 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative z-10 w-12 h-12 rounded-full bg-gray-900 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform duration-300">
              {step.icon}
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div
          className={`${
            isEven ? "md:order-2" : "md:order-1"
          } relative text-center md:text-left`}
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6 rounded-xl border border-cyan-400/10 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:border-cyan-400/30">
            <h3 className="text-base md:text-lg font-semibold text-cyan-400 mb-1 tracking-wide">
              {step.title}
            </h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("organizador");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Configurações de animação
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email cadastrado:", email);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const steps: Step[] = [
    {
      title: "Cadastre-se e crie seu evento",
      description: "Registro simples em 1 minuto para começar seu evento",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      title: "Configure os ingressos",
      description: "Personalize tipos, valores e quantidades facilmente",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
    },
    {
      title: "Compartilhe e venda online",
      description: "Link exclusivo para divulgação nas redes sociais",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
    },
    {
      title: "Valide com QR Code",
      description: "Sistema rápido de check-in com leitor automático",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Efeitos de fundo futuristas */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-cyan-400/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-cyan-400">⟁</span>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              EVENTRY
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="hover:text-cyan-400 transition-colors"
            >
              Recursos
            </a>
            <a
              href="#how-it-works"
              className="hover:text-cyan-400 transition-colors"
            >
              Como Funciona
            </a>
            <a
              href="#pricing"
              className="hover:text-cyan-400 transition-colors"
            >
              Preços
            </a>
            <Link
              to="/signup"
              className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/20"
            >
              Começar Agora
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                O futuro do seu evento
              </span>
              <span className="text-cyan-400 animate-pulse">_</span>
            </h2>
            <p className="mb-6 text-lg text-gray-400">
              Simplifique a venda de ingressos e o controle de acesso com nossa
              plataforma tudo-em-um. Diga adeus às filas e aos problemas de
              gestão.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <button className="bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30 font-medium">
                Criar meu evento
              </button>
              <button className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-md hover:bg-cyan-400/10 transition-colors font-medium">
                Ver demonstração
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-1 backdrop-blur-sm">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-sm text-cyan-400 space-y-2">
                  <p> Iniciando sistema Eventry v3.0...</p>
                  <p> Conectando à rede blockchain...</p>
                  <p> QR Code generator: ATIVO</p>
                  <p> Sistema pronto.</p>
                  <p className="flex items-center">
                    <span> </span>
                    <span className="w-2 h-5 bg-cyan-400 ml-1 animate-pulse"></span>
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-cyan-400/10 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-purple-500/10 blur-xl animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-center mb-8 space-x-4">
            <motion.button
              onClick={() => handleTabChange("organizador")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === "organizador"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                  : "border border-gray-600 text-gray-300 hover:border-cyan-400"
              }`}
            >
              Sou Organizador
            </motion.button>

            <motion.button
              onClick={() => handleTabChange("participante")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === "participante"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                  : "border border-gray-600 text-gray-300 hover:border-cyan-400"
              }`}
            >
              Sou Participante
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {activeTab === "organizador" ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-cyan-400">
                    Solução completa para organizadores
                  </h3>
                  <p className="mb-6 text-gray-400">
                    Crie seu evento em minutos, venda ingressos online com
                    segurança e controle o acesso com QR Codes.
                  </p>
                  <ul className="text-left max-w-2xl mx-auto space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⟁</span> Crie eventos
                      personalizados em minutos
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⧉</span> Aceite
                      pagamentos por PIX, cartão e boleto
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⌗</span> Controle de
                      acesso com QR Code integrado
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⇶</span> Relatórios e
                      analytics em tempo real
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⍟</span>{" "}
                      Gerenciamento de participantes simplificado
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-cyan-400">
                    Experiência perfeita para participantes
                  </h3>
                  <p className="mb-6 text-gray-400">
                    Compre ingressos de forma rápida e segura, receba seu
                    ingresso digital e acesse o evento sem filas.
                  </p>
                  <ul className="text-left max-w-2xl mx-auto space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⟁</span> Compre
                      ingressos em poucos cliques
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⧉</span> Receba
                      ingresso digital no seu e-mail e celular
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⌗</span> Acesso
                      rápido ao evento sem filas
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⇶</span> Transações
                      100% seguras
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">⍟</span> Reembolsos
                      facilitados quando disponíveis
                    </li>
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Recursos Avançados
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Gestão Completa",
                desc: "Controle seu evento de ponta a ponta com nossa plataforma integrada",
              },
              {
                icon: "💳",
                title: "Pagamentos Seguros",
                desc: "Integração com os principais meios de pagamento digitais",
              },
              {
                icon: "📊",
                title: "Relatórios Inteligentes",
                desc: "Dados em tempo real para tomada de decisões estratégicas",
              },
              {
                icon: "📱",
                title: "App de Check-in",
                desc: "Validação instantânea de ingressos via QR Code",
              },
              {
                icon: "🛡️",
                title: "Segurança",
                desc: "Proteção contra fraudes e ingressos falsificados",
              },
              {
                icon: "🔌",
                title: "Integrações",
                desc: "Conecte com suas ferramentas favoritas via API",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-400/50 transition-colors hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-cyan-400">
                  {feature.title}
                </h4>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-10 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Como Funciona
            </span>
          </h3>

          <div className="relative py-6 overflow-hidden">
            {/* Linha vertical neon */}
            <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent transform -translate-x-1/2 pointer-events-none">
              <div className="absolute inset-0 bg-cyan-400/10 blur-xl animate-pulse"></div>
            </div>

            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Planos Futuristas
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "R$ 0",
                desc: "Para pequenos eventos",
                features: [
                  "Até 100 ingressos",
                  "Pagamento por PIX",
                  "Suporte básico",
                ],
                featured: false,
              },
              {
                name: "Pro",
                price: "5%",
                desc: "Para eventos profissionais",
                features: [
                  "Ingressos ilimitados",
                  "Todos pagamentos",
                  "Relatórios",
                  "Suporte prioritário",
                ],
                featured: true,
              },
              {
                name: "Enterprise",
                price: "Sob consulta",
                desc: "Para grandes marcas",
                features: [
                  "Conta dedicada",
                  "Integrações",
                  "Suporte 24/7",
                  "Branding",
                ],
                featured: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-gray-800/50 border rounded-lg p-6 relative overflow-hidden ${
                  plan.featured
                    ? "border-cyan-400 shadow-lg shadow-cyan-500/20 transform md:-translate-y-4"
                    : "border-gray-700"
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-cyan-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wide">
                    Popular
                  </div>
                )}
                <h4 className="text-xl font-semibold mb-2 text-cyan-400">
                  {plan.name}
                </h4>
                <p className="text-gray-400 mb-4">{plan.desc}</p>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8 text-gray-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    plan.featured
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  }`}
                >
                  {plan.featured ? "Assinar Agora" : "Saiba Mais"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para revolucionar seus eventos?
          </h3>
          <p className="text-xl text-gray-400 mb-8">
            Junte-se à nova era da gestão de eventos com tecnologia de ponta.
          </p>
          <button className="bg-cyan-600 text-white px-8 py-4 rounded-md hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30 font-bold text-lg">
            Comece Agora - É Grátis
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
              Receba Novidades
            </h3>
            <p className="text-gray-400 mb-6 text-center">
              Assine nossa newsletter para ficar por dentro das atualizações.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                required
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 transition-colors font-medium"
              >
                Assinar
              </button>
            </form>
            {submitted && (
              <p className="text-green-400 mt-4 text-center">
                ✓ Obrigado por se inscrever! Você receberá nossas atualizações.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/80 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl text-cyan-400">⟁</span>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  EVENTRY
                </h3>
              </div>
              <p className="text-gray-400">
                O futuro dos seus eventos começa aqui.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">
                Produto
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Preços
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">
                Empresa
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Carreiras
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">
                Legal
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
            © {new Date().getFullYear()} Eventry. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
