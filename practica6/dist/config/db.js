"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectBD = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectBD = async () => {
    try {
        const url = process.env.DATABASE_URL;
        const connection = await mongoose_1.default.connect(url);
        console.log('Mongo conectado');
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.connectBD = connectBD;
//# sourceMappingURL=db.js.map