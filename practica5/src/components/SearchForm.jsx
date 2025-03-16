import { useEffect, useState } from "react";
import { useAppStore } from '/src/store/useAppStore.js';

export default function SearchForm() {
    // Llamada a las funciones del store
    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const categories = useAppStore((state) => state.categories);
    const searchRecipes = useAppStore((state) => state.searchRecipes); // Traemos la función del store

    // Estado para los filtros de búsqueda
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        });
    };

    // Función para manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();  // Evita el comportamiento predeterminado del formulario

        // Validar que todos los campos estén completos
        if (Object.values(searchFilters).includes('')) {
            console.log('Todos los campos son obligatorios');
            return;  // Detiene la ejecución si algún campo está vacío
        }

        // Llamar a la función searchRecipes del store con los filtros
        searchRecipes(searchFilters);
    };

    // Cargar las categorías cuando el componente se monte
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]); // La función solo se ejecuta una vez al montar el componente

    return (
        <form
            className="bg-orange-400 p-10 rounded-lg shadow space-y-6 w-full max-w-md mx-auto"
            onSubmit={handleSubmit}  // Asignamos el manejador de eventos para el submit
        >
            <div className="space-y-4">
                <label
                    htmlFor="ingredient"
                    className="block text-white uppercase font-extrabold text-lg"
                >
                    Nombre o Ingredientes
                </label>
                <input
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    value={searchFilters.ingredient}  // Vincula el valor del estado
                    onChange={handleChange}           // Llama a handleChange cuando cambie el valor
                    className="p-3 w-full rounded-lg focus:outline-none bg-white"
                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                />
            </div>

            <div className="space-y-4">
                <label
                    htmlFor="category"
                    className="block text-white uppercase font-extrabold text-lg"
                >
                    Categoría
                </label>
                <select
                    id="category"
                    name="category"
                    value={searchFilters.category} // Vincula el valor del estado
                    onChange={handleChange}        // Llama a handleChange cuando cambie el valor
                    className="p-3 w-full rounded-lg focus:outline-none bg-white"
                >
                    <option value="">-- Seleccione --</option>
                    {/* Aquí poblar las opciones del select con las categorías */}
                    {categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <option key={category.strCategory} value={category.strCategory}>
                                {category.strCategory}
                            </option>
                        ))
                    ) : (
                        <option value="">Cargando categorías...</option>
                    )}
                </select>
            </div>

            <input
                type="submit"
                value="Buscar Recetas"
                className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
        </form>
    );
}
