import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ importar o Toaster
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SingInPage";

export default function App() {
  return (
    <Router>
      {/* ✅ O Toaster deve ficar aqui, fora das rotas */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937", // bg-gray-900
            color: "#a5f3fc", // text-cyan-300
            border: "1px solid #0e7490", // cyan-600
          },
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}
