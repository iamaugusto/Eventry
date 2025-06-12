import React, { useState } from "react";
import "./HomePage.css";

const HomePage: React.FC = () => {
  // const [activeTab, setActiveTab] = useState('organizer');
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email cadastrado:", email);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="futuristic-landing">
      {/* Animated Background */}
      <div className="grid-lines"></div>
      <div className="particles"></div>

      {/* Header */}
      <header className="neon-header">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">🎟️</span>
            <h1 className="glow-text">EVENTRY</h1>
          </div>
          <nav className="nav">
            <a href="#features" className="nav-link">
              Recursos
            </a>
            <a href="#how-it-works" className="nav-link">
              Funcionalidades
            </a>
            <a href="#pricing" className="nav-link">
              Planos
            </a>
            <button className="neon-button">ACESSAR PLATAFORMA</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="cyber-hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">
              <span className="gradient-text">O FUTURO</span> DOS SEUS EVENTOS
              <span className="blink">_</span>
            </h2>
            <p className="hero-subtitle">
              Tecnologia avançada para gestão de ingressos com blockchain e IA.
              <br />
              Controle total, segurança máxima e experiência perfeita.
            </p>
            <div className="cta-buttons">
              <button className="neon-button primary">CRIAR EVENTO</button>
              <button className="neon-button secondary">VER DEMO</button>
            </div>
          </div>
          <div className="hero-visual">
            {/* Substituindo o holograma por uma animação de dados mais sutil */}
            <div className="data-flow-animation">
              <div className="circles-container">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="floating-circle"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      left: `${10 + i * 20}%`,
                      width: `${40 - i * 5}px`,
                      height: `${40 - i * 5}px`,
                      opacity: 0.7 - i * 0.1,
                    }}
                  ></div>
                ))}
              </div>
              <div className="floating-qr">
                <div className="qr-lines">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="qr-line"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="cyber-features">
        <div className="container">
          <h2 className="section-title">
            <span className="section-title-bg">TECNOLOGIA</span>
            <span className="section-title-fg">AVANÇADA</span>
          </h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Blockchain Security</h3>
              <p>Ingressos imutáveis e verificáveis via blockchain.</p>
              <div className="feature-underline"></div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Smart Contracts</h3>
              <p>Lógica de negócios automatizada e transparente.</p>
              <div className="feature-underline"></div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Analytics</h3>
              <p>Previsões e insights inteligentes para seus eventos.</p>
              <div className="feature-underline"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="cyber-steps">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">FLUXO</span> DE TRABALHO
          </h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-number">01</div>
              <div className="timeline-content">
                <h3>Criação do Evento</h3>
                <p>Configure todos os detalhes em nossa interface futurista.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">02</div>
              <div className="timeline-content">
                <h3>Venda de Ingressos</h3>
                <p>Distribuição via NFT ou ingressos tradicionais.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">03</div>
              <div className="timeline-content">
                <h3>Controle de Acesso</h3>
                <p>Verificação instantânea com reconhecimento facial.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cyber-cta">
        <div className="container">
          <h2>PRONTO PARA REVOLUCIONAR SEUS EVENTOS?</h2>
          <p>
            Junte-se à nova era da gestão de eventos com tecnologia de ponta.
          </p>
          <button className="neon-button xl">COMEÇAR AGORA</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="cyber-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">🎟️</span>
                <h1 className="glow-text">EVENTRY</h1>
              </div>
              <p>Tecnologia e inovação para eventos extraordinários.</p>
            </div>
            <div className="footer-links">
              <h3>NAVEGAÇÃO</h3>
              <a href="#features">Recursos</a>
              <a href="#how-it-works">Como funciona</a>
              <a href="#pricing">Planos</a>
            </div>
            <div className="footer-links">
              <h3>LEGAL</h3>
              <a href="#">Termos</a>
              <a href="#">Privacidade</a>
              <a href="#">Cookies</a>
            </div>
            <div className="footer-newsletter">
              <h3>NEWSLETTER</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="neon-button sm">
                  <span className="hover-effect">ASSINAR</span>
                </button>
              </form>
              {submitted && (
                <div className="success-message">✔️ Inscrito com sucesso!</div>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Eventry Tech. Todos os direitos
              reservados.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">
                𝕏
              </a>
              <a href="#" className="social-icon">
                𝔻
              </a>
              <a href="#" className="social-icon">
                𝕀
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
