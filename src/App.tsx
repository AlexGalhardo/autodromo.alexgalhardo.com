import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import NotFound from "./Components/NotFound";
import LoginForm from "./Components/Auth/Login";
import "./Style.css";
import Home from "./Pages/Home";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStateProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    );
}
