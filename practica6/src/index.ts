import express from 'express';
import router from './routes';
import { connectDB } from './config/db';

const PORT = 3000;
const app = express();

// Conectar a MongoDB antes de levantar el servidor
connectDB();

app.use(express.json()); // Middleware para manejar JSON
app.use('/', router); // Usar las rutas definidas en 'routes.ts'

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
