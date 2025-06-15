import { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    senha: false,
  });

  const errors = {
    nome: !form.nome.trim() ? "Nome é obrigatório" : "",
    email: !form.email.trim()
      ? "Email é obrigatório"
      : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)
      ? "Email inválido"
      : "",
    senha: !form.senha
      ? "Senha é obrigatória"
      : form.senha.length < 6
      ? "Mínimo 6 caracteres"
      : "",
  };

  const isValid = !errors.nome && !errors.email && !errors.senha;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function fakeApiCall() {
    return new Promise((resolve) => setTimeout(() => resolve("sucesso"), 2000));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      nome: true,
      email: true,
      senha: true,
    });

    if (!isValid) return;

    await toast.promise(
      fakeApiCall(),
      {
        loading: "Cadastrando...",
        success: "Cadastrado com sucesso!",
        error: "Erro ao cadastrar. Tente novamente.",
      },
      {
        style: {
          background: "#1f2937", // bg-gray-900
          color: "#a5f3fc", // text-cyan-300
          border: "1px solid #0e7490", // cyan-600
        },
        iconTheme: {
          primary: "#06b6d4", // cyan-500
          secondary: "#f0fdfa",
        },
      }
    );

    // Resetar formulário se quiser
    // setForm({ nome: "", email: "", senha: "" });
  }

  return (
    <section className="min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Efeitos de fundo neon */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent blur-sm"></div>
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/70 to-transparent blur-sm"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent blur-sm"></div>
        <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent blur-sm"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-cyan-400 blur-md animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-purple-500 blur-md animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative"
      >
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-lg shadow-2xl">
          <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2"
              >
                Criar Conta
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-400"
              >
                Junte-se à nossa plataforma e comece a gerenciar seus eventos
                profissionalmente
              </motion.p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {[
                {
                  label: "Nome",
                  name: "nome",
                  type: "text",
                  placeholder: "Seu nome completo",
                  error: errors.nome,
                  touched: touched.nome,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "email@exemplo.com",
                  error: errors.email,
                  touched: touched.email,
                },
                {
                  label: "Senha",
                  name: "senha",
                  type: "password",
                  placeholder: "••••••••",
                  error: errors.senha,
                  touched: touched.senha,
                },
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {field.label}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-gray-800/50 border border-gray-700/70 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400/50 transition-all"
                    sx={{
                      color: "white",
                      "& input::placeholder": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "&:before": { borderBottom: "none" },
                      "&:after": { borderBottom: "none" },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none",
                      },
                    }}
                    error={!!(field.touched && field.error)}
                  />
                  {field.touched && field.error && (
                    <p className="mt-1 text-xs text-rose-400/90">
                      {field.error}
                    </p>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  type="submit"
                  disabled={!isValid}
                  variant="contained"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-500 !text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-500 hover:shadow-cyan-500/20"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    "&.Mui-disabled": {
                      color: "rgba(255,255,255,0.5)",
                    },
                  }}
                >
                  Cadastrar
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-6"
            >
              <p className="text-xs text-gray-500">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Entrar agora
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
