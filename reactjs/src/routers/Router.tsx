import useAuth from "../hooks/useAuth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function Router() {
    const {isAuthorized} = useAuth();

    return <BrowserRouter>
        <Routes>
        {!isAuthorized && <Route path="/Login" element={<Login />}/>}
        <Route path="*" element={<Home />}/>
    </Routes>
    </BrowserRouter>
}
