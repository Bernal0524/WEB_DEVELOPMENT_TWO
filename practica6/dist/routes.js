"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = require("./controllers/User.Controller");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API 🚀');
});
router.post('/auth/register', [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("username").isString().notEmpty().withMessage("Username is required")
], async (req, res) => {
    (0, User_Controller_1.createAccount)(req, res);
});
router.post('/auth/login', [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password must be at least 8 characters"),
], async (req, res) => {
    (0, User_Controller_1.login)(req, res);
});
exports.default = router;
//# sourceMappingURL=routes.js.map