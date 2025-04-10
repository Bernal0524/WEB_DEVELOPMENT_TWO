"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createAccount = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const auth_1 = require("../utils/auth");
const express_validator_1 = require("express-validator");
const createAccount = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, password, email, username } = req.body;
    const userExists = await Users_1.default.findOne({ email });
    if (userExists) {
        res.status(409).json({ message: "User already exists for this email" });
        return;
    }
    const usernameExists = await Users_1.default.findOne({ username });
    if (usernameExists) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }
    const user = new Users_1.default(req.body);
    user.password = await (0, auth_1.hashPassword)(password);
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
};
exports.createAccount = createAccount;
const login = async (req, res) => {
    // Validar los errores en la solicitud
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body;
    // Buscar al usuario en la base de datos
    const user = await Users_1.default.findOne({ email });
    if (!user) {
        const error = new Error('Invalid credentials');
        return res.status(401).json({ error: error.message });
    }
    // Comprobar si el password es correcto (OJO: Importar validatePassword de utils/auth)
    const isPasswordCorrect = await (0, auth_1.validatePassword)(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error('Invalid credentials');
        return res.status(401).json({ error: error.message });
    }
    // Si todo es correcto, enviar respuesta de autenticación exitosa
    res.status(200).send('Authenticated');
};
exports.login = login;
//# sourceMappingURL=User.Controller.js.map