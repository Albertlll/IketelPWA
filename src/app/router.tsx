import { createBrowserRouter } from "react-router";
// import Home from "../pages/home"
import Lobby from "@/pages/lobbby/ui/lobby";
import QrScan from "@/pages/qr-scan/ui/qr-scan";
import { SocketProtectedRoute } from "./guards";
import Layout from "@/feature/adventure/ui/layout";
import HomePage from "@/pages/home/ui/home";



export default createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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

