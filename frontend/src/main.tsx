import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./context/AppContext.tsx";
import "leaflet/dist/leaflet.css";
import { SocketProvider } from "./context/SocketContext.tsx";

export const authService = "YOUR_AUTH_RENDER_URL";

export const restaurantService = "https://tomato-restaurant-j4xd.onrender.com";

export const utilsService = "https://tomato-utils-bkzt.onrender.com";

export const realtimeService = "https://tomato-realtime-30cm.onrender.com";

export const riderService = "https://tomato-rider-tzbj.onrender.com";

export const adminService = "https://tomato-admin-lq7h.onrender.com";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="892304210340-vjd5ho3ocn31fbi01icpgppv7kqeh38v.apps.googleusercontent.com">
      <AppProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
