import "./Style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import NotFound from "./Components/NotFound";
import LoginForm from "./Components/Auth/Login";
import Races from "./Pages/Races";
import Users from "./Pages/Users";
import Schedules from "./Pages/Schedules";
import Maintenances from "./Pages/Maintenances";
import Roads from "./Pages/Roads";
import Karts from "./Pages/Karts";
import Notifications from "./Pages/Notifications";
import RacesHistory from "./Pages/RacesHistory";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
                <Routes>
                    <Route path="/" element={<Races />} />
                    <Route path="/races" element={<Races />} />
                    <Route path="/races/history" element={<RacesHistory />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/maintenances" element={<Maintenances />} />
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/roads" element={<Roads />} />
                    <Route path="/karts" element={<Karts />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}
