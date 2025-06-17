import { Navigate } from "react-router-dom";
import { useUserStore } from "./src/store/userStore";
import React from "react";

export default function PrivateRoute({
  children,
  requiredType,
}: {
  children: React.ReactNode;
  requiredType: "organizer" | "participant";
}) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (user.type !== requiredType) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
