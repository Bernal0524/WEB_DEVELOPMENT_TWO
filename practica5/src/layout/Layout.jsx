import { Outlet } from "react-router"; 
import Header from "../components/Header"; 
import Modal from "../components/Modal"; // Importar el componente Modal
import { useEffect } from "react"; 
import { useAppStore } from "../store/useAppStore"; // Importar el store

export default function Layout() { 
  // Cargar los favoritos desde el localStorage
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage(); // Llamada al cargar el componente
  }, [loadFromStorage]);

  return ( 
    <> 
      <Header /> 
      <main className="mx-auto container py-16"> 
        <Outlet /> 
      </main> 
      <Modal />  {/* Renderizando Modal después de <main> */}
    </> 
  ); 
}
