import { Request, Response } from 'express';
import User from '../models/User'; // Asegúrate de que la ruta sea correcta

export const createAccount = async (req: Request, res: Response): Promise<void> => {
    const { name, password, email, username } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(409).json({ message: "User already exists for this email" });
        return;
    }

    // Verificar si el nombre de usuario ya está registrado
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }

    // Crear un nuevo usuario si no existe
    const user = new User(req.body);
    await user.save();

    // Responder con éxito
    res.status(201).json({ message: 'User created successfully' });
};
