import { createBrowserRouter, Navigate, useParams } from "react-router";
// import Home from "../pages/home"
import Lobby from "@/pages/lobbby/ui/lobby";
import QrScan from "@/pages/qr-scan/ui/qr-scan";
import { SocketProtectedRoute } from "./guards";
import Layout from "@/feature/adventure/ui/layout";
import HomePage from "@/pages/home/ui/home";


const RedirectToLobby = () => {
  const params = useParams();
  return <Navigate to="/" state={{ scannedCode: params.roomId }} />
}


export default createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/enterRoom/:roomId",
    element: <RedirectToLobby />
  },
  {
    path: "/lobby",
    element: <SocketProtectedRoute>
      <Lobby />
    </SocketProtectedRoute>
  },
  {
    path: "/adventure",
    element: <SocketProtectedRoute>
      <Layout />
    </SocketProtectedRoute>
  },
  {
    path: "/qr-scan",
    Component: QrScan
  }
])

