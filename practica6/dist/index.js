"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./config/db"); // Importación de la función de conexión
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware para procesar JSON en las solicitudes
app.use('/', routes_1.default); // Configuración de rutas
// Conexión a la base de datos antes de levantar el servidor
(0, db_1.connectBD)().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
});
exports.default = app;
//# sourceMappingURL=index.js.map