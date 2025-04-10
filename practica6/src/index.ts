import express from 'express';
import router from './routes';
import { connectBD } from './config/db'; // Importación de la función de conexión

const PORT = 3000;
const app = express();

app.use(express.json()); // Middleware para procesar JSON en las solicitudes
app.use('/', router); // Configuración de rutas

// Conexión a la base de datos antes de levantar el servidor
connectBD().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('No se pudo conectar a la base de datos:', error);
});

export default app;
