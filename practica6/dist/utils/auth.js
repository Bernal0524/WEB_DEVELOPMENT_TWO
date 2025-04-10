"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.validatePassword = validatePassword;
const argon2_1 = __importDefault(require("argon2"));
// Genera un hash seguro para una contraseña en texto plano.
async function hashPassword(plainPassword) {
    return await argon2_1.default.hash(plainPassword);
}
// Valida si una contraseña en texto plano coincide con su versión encriptada.
async function validatePassword(plainPassword, hashedPassword) {
    return await argon2_1.default.verify(hashedPassword, plainPassword);
}
//# sourceMappingURL=auth.js.map