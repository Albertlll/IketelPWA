import SocketService from "@/shared/api/sockets";
import { Navigate, useNavigate } from "react-router";


// Компонент-обёртка для проверки подключения
export const SocketProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const socketService = SocketService.getInstance();

  const navigate = useNavigate();

  socketService.on("host_disconnected", () => {
    console.log("pepep")
    navigate("/")
    socketService.disconnect()
  })

  if (!socketService.isConnected()) {
    // Можно перенаправить на домашнюю страницу или показать ошибку
    return <Navigate to="/" />
  }

  return <>{children}</>;
};