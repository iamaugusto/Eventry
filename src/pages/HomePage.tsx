import React from "react";
import { useState } from "react";
import "./HomePage.css";

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("organizador");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o email para seu backend
    console.log("Email cadastrado:", email);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">🎟️</span>
            <h1>Eventry</h1>
          </div>
          <nav className="nav">
            <a href="#features">Recursos</a>
            <a href="#how-it-works">Como Funciona</a>
            <a href="#pricing">Preços</a>
            <button className="btn-primary">Começar Agora</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>O futuro do seu evento começa aqui</h2>
            <p>
              Simplifique a venda de ingressos e o controle de acesso com nossa
              plataforma tudo-em-um. Diga adeus às filas e aos problemas de
              gestão.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Criar meu evento</button>
              <button className="btn-secondary">Ver demonstração</button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Público em evento feliz"
            />
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="tabs-section">
        <div className="container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${
                activeTab === "organizador" ? "active" : ""
              }`}
              onClick={() => setActiveTab("organizador")}
            >
              Sou Organizador
            </button>
            <button
              className={`tab-btn ${
                activeTab === "participante" ? "active" : ""
              }`}
              onClick={() => setActiveTab("participante")}
            >
              Sou Participante
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "organizador" ? (
              <div className="organizer-content">
                <h3>Solução completa para organizadores de eventos</h3>
                <p>
                  Crie seu evento em minutos, venda ingressos online com
                  segurança e controle o acesso com QR Codes. Tudo em uma única
                  plataforma simples e acessível.
                </p>
                <ul className="benefits-list">
                  <li>🎯 Crie eventos personalizados em minutos</li>
                  <li>💳 Aceite pagamentos por PIX, cartão e boleto</li>
                  <li>📱 Controle de acesso com QR Code integrado</li>
                  <li>📊 Relatórios e analytics em tempo real</li>
                  <li>👥 Gerenciamento de participantes simplificado</li>
                </ul>
              </div>
            ) : (
              <div className="attendee-content">
                <h3>Experiência perfeita para participantes</h3>
                <p>
                  Compre ingressos de forma rápida e segura, receba seu ingresso
                  digital e acesse o evento sem filas com um simples scan do QR
                  Code.
                </p>
                <ul className="benefits-list">
                  <li>🛒 Compre ingressos em poucos cliques</li>
                  <li>📲 Receba ingresso digital no seu e-mail e celular</li>
                  <li>⏱️ Acesso rápido ao evento sem filas</li>
                  <li>🔒 Transações 100% seguras</li>
                  <li>🔄 Reembolsos facilitados quando disponíveis</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Recursos que fazem a diferença</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Criação Rápida</h3>
              <p>
                Configure seu evento e comece a vender ingressos em menos de 5
                minutos.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Múltiplas Formas de Pagamento</h3>
              <p>
                Aceite PIX, cartões de crédito/débito e boletos com taxas
                competitivas.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>QR Code Integrado</h3>
              <p>
                Controle de acesso rápido e seguro com validação em tempo real.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Relatórios Detalhados</h3>
              <p>Acompanhe vendas, compareceram e receita em tempo real.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Segurança</h3>
              <p>Proteção contra fraudes e ingressos falsificados.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📢</div>
              <h3>Ferramentas de Marketing</h3>
              <p>
                Compartilhamento fácil e códigos promocionais para impulsionar
                vendas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">Como funciona</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Crie seu evento</h3>
              <p>
                Preencha os detalhes básicos como nome, data, local e tipos de
                ingressos.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Personalize sua página</h3>
              <p>
                Adicione fotos, descrição e personalize cores para combinar com
                sua marca.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Compartilhe e venda</h3>
              <p>Divulgue seu evento e comece a vender ingressos online.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Controle o acesso</h3>
              <p>
                No dia do evento, valide os ingressos com nosso app de controle
                por QR Code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">
            Organizadores que confiam na Eventry
          </h2>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p>
                "Antes perdíamos muito tempo com ingressos em PDF e
                transferências. Com a Eventry, tudo ficou automático e nosso
                evento teve 30% mais participantes!"
              </p>
              <div className="author">
                <div className="author-avatar">👩</div>
                <div className="author-info">
                  <strong>Ana Silva</strong>
                  <span>Produtora Cultural</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p>
                "A redução de fraudes foi imediata. Antes tínhamos problemas com
                ingressos falsos, agora com o QR Code único isso acabou."
              </p>
              <div className="author">
                <div className="author-avatar">👨</div>
                <div className="author-info">
                  <strong>Carlos Mendes</strong>
                  <span>Organizador de Festivais</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing">
        <div className="container">
          <h2 className="section-title">Planos Acessíveis</h2>
          <p className="section-subtitle">
            Pague apenas quando vender. Sem mensalidades fixas.
          </p>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Grátis</h3>
              <div className="price">0%</div>
              <p>por ingresso vendido</p>
              <ul className="plan-features">
                <li>Até 50 ingressos/mês</li>
                <li>Pagamento apenas por PIX</li>
                <li>Suporte por e-mail</li>
                <li>QR Code básico</li>
              </ul>
              <button className="btn-outline">Começar</button>
            </div>
            <div className="pricing-card featured">
              <div className="popular-badge">POPULAR</div>
              <h3>Profissional</h3>
              <div className="price">5%</div>
              <p>por ingresso vendido</p>
              <ul className="plan-features">
                <li>Ingressos ilimitados</li>
                <li>Todos os métodos de pagamento</li>
                <li>Suporte prioritário</li>
                <li>QR Code avançado</li>
                <li>Relatórios detalhados</li>
                <li>Ferramentas de marketing</li>
              </ul>
              <button className="btn-primary">Assinar</button>
            </div>
            <div className="pricing-card">
              <h3>Personalizado</h3>
              <div className="price">Sob consulta</div>
              <p>para grandes eventos</p>
              <ul className="plan-features">
                <li>Todos os recursos profissionais</li>
                <li>Conta dedicada</li>
                <li>Integrações personalizadas</li>
                <li>Suporte 24/7</li>
                <li>Branding personalizado</li>
              </ul>
              <button className="btn-outline">Fale Conosco</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Pronto para transformar seus eventos?</h2>
          <p>
            Junte-se a centenas de organizadores que já simplificaram sua vida
            com a Eventry.
          </p>
          <button className="btn-primary btn-large">
            Comece Agora - É Grátis
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h3>Quer receber dicas para organizar eventos?</h3>
            <p>Assine nossa newsletter e receba conteúdo exclusivo.</p>
          </div>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Assinar
            </button>
          </form>
          {submitted && (
            <div className="success-message">
              Obrigado por se inscrever! Você receberá nossas dicas em breve.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">
            <span className="logo-icon">🎟️</span>
            <h3>Eventry</h3>
            <p>O futuro do seu evento começa aqui</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Produto</h4>
              <a href="#features">Recursos</a>
              <a href="#how-it-works">Como funciona</a>
              <a href="#pricing">Preços</a>
              <a href="#">FAQ</a>
            </div>
            <div className="link-group">
              <h4>Empresa</h4>
              <a href="#">Sobre nós</a>
              <a href="#">Blog</a>
              <a href="#">Carreiras</a>
              <a href="#">Contato</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Termos de uso</a>
              <a href="#">Política de privacidade</a>
            </div>
          </div>
          <div className="footer-social">
            <h4>Siga-nos</h4>
            <div className="social-icons">
              <a href="#">
                <span>📱</span>
              </a>
              <a href="#">
                <span>📷</span>
              </a>
              <a href="#">
                <span>🔗</span>
              </a>
              <a href="#">
                <span>🎥</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>© 2023 Eventry. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
