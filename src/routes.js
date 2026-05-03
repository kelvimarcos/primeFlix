import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Filme from "./pages/Filme/Filme";

import Favoritos from "./pages/Favoritos";

import Erro from './pages/Erro/';

import Header from "./components/header";
import Footer from "./components/footer";


function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Filme />} />
                <Route path="/favoritos" element={<Favoritos />} />

                <Route path="*" element={<Erro />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );

}

export default RoutesApp;