import { Link, useLocation } from 'react-router';
import SearchForm from "../components/SearchForm"; // Asegúrate de importar el SearchForm

export default function Header() {
    // Detecta la página actual
    const { pathname } = useLocation();
    const isHome = pathname === '/'; // Verifica si la página es la de inicio

    return (
        <header className={isHome ? "bg-[url('/bg.jpg')] bg-center bg-cover h-screen relative" : "bg-slate-800"}>
            <div className="mx-auto container px-5 py-16 relative z-10">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="logo.svg" alt="logotipo" className="w-32" />
                    </div>
                    <nav className="flex gap-4">
                        <Link to="/" className={`text-white uppercase font-bold ${isHome ? "underline" : ""}`}>
                            Inicio
                        </Link>
                        <Link to="/favoritos" className={`text-white uppercase font-bold ${!isHome ? "underline" : ""}`}>
                            Favoritos
                        </Link>
                    </nav>
                </div>
            </div>
            
            {/* SearhForm */}
            {isHome && (
                <div className="absolute bottom-5 left-6 sm:bottom-4 sm:left-6 md:bottom-6 md:left-6 lg:bottom-8 lg:left-6 xl:bottom-10 xl:left-8 m-5 w-full max-w-lg sm:max-w-md">
                    <SearchForm />
                </div>
            )}
        </header>
    );
}
