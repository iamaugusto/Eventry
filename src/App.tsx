import { useEffect } from "react";
import { useUserStore } from "./store/userStore"; // ajuste o caminho
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import OrganizerPage from "./pages/OrganizerPage";
import PrivateRoute from "../PrivateRoute";
import ParticipantPage from "./pages/ParticipantPage";

export default function App() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/participant" element={<ParticipantPage />} />
        <Route
          path="/organizer"
          element={
            <PrivateRoute requiredType="organizer">
              <OrganizerPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
