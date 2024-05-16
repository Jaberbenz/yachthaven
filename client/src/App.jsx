import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout.jsx";
import { UserContextProvider } from "./UserContext.jsx";
import BackOfficePrestataire from "./pages/BackOfficePrestataire.jsx";
import ClientAccountPage from "./pages/ClientAccount.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrestataireProfilePage from "./pages/PrestataireProfile.jsx";
import PrestationFormPage from "./pages/PrestationFormPage.jsx";
import PrestationPage from "./pages/PrestationPage.jsx";
import PrestationsPage from "./pages/PrestationsPage.jsx";
import RegisterChoice from "./pages/RegisterChoice.jsx";
import RegisterPageClient from "./pages/RegisterPageClient.jsx";
import RegisterPagePrestataire from "./pages/RegisterPagePrestataire.jsx";
import ReservationPage from "./pages/ReservationPage.jsx";
import ReservationsPage from "./pages/ReservationsPage.jsx";
import EditProfile from "./pages/UpdateClient.jsx";
import EditProfilePres from "./pages/UpdatePrestataire.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-client" element={<RegisterPageClient />} />
          <Route
            path="/backoffice-prestataire"
            element={<BackOfficePrestataire />}
          />
          <Route
            path="/account-client/:id/:subpage?"
            element={<ClientAccountPage />}
          />
          <Route path="/account-client/update/:id" element={<EditProfile />} />
          <Route
            path="/account-prestataire/update/:id"
            element={<EditProfilePres />}
          />
          <Route
            path="/account-prestataire/:id"
            element={<PrestataireProfilePage />}
          />
          <Route
            path="/account-prestataire/services"
            element={<PrestationsPage />}
          />
          <Route
            path="/account-prestataire/services/new"
            element={<PrestationFormPage />}
          />
          <Route
            path="/account-prestataire/services/:id"
            element={<PrestationFormPage />}
          />
          <Route
            path="/register-prestataire"
            element={<RegisterPagePrestataire />}
          />
          <Route path="/prestation/:id" element={<PrestationPage />} />
          <Route
            path="/account-client/bookings"
            element={<ReservationsPage />}
          />
          <Route
            path="/account-client/bookings/:id"
            element={<ReservationPage />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
