import { Outlet } from "react-router-dom";
import "../index.css"; 
import Navigation from "../components/Navigation";

export default function Layout() {
  return (
    <>
      <Navigation />
      <main className="font-sans antialiased">
        <Outlet />
      </main>
    </>
  );
}