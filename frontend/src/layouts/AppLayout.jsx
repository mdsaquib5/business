import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
