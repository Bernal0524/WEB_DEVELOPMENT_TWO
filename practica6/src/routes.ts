import { Router, Request, Response } from 'express';
import User from './models/User'; // Asegúrate de que la ruta sea correcta
import { createAccount } from './controllers/User.Controller';

const router = Router();

// Ruta de bienvenida
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Bienvenido a la API 🚀');
});

// Ruta de registro de usuario
router.post('/auth/register', createAccount); // Usamos la función createAccount del controlador

export default router;
