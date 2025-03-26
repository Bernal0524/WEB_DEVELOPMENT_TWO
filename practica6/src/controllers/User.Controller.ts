import { Request, Response } from 'express';
import User from '../models/User';  // Ajusta la ruta si es necesario
import { hashPassword } from '../utils/hashPassword';  // Importa la función para hacer el hash

// Función para crear la cuenta
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

    // Hashear la contraseña antes de crear el usuario
    const hashedPassword = await hashPassword(password);

    // Crear un nuevo usuario con la contraseña hasheada
    const user = new User({
        ...req.body,
        password: hashedPassword // Asignar la contraseña hasheada
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Responder con éxito
    res.status(201).json({ message: 'User created successfully' });
};
