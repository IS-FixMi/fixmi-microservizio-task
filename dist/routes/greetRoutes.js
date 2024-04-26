"use strict";
/**
 *   File: greetRoutes.ts
 *
 *   Purpose: this file contains all the routes after
 *            /api/greet
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// '/api/greet'
const greetRouter = express_1.default.Router();
/*
 * ## GET Route /api/greet/
 *
 * Returns a greet message in json in the form {text: stirng}
 *
 */
exports.default = greetRouter.get('/', (req, res) => {
    // Return a json
    res.json(getHelloWorld());
});
/**
 * @returns a json with text: "Hello World from Backend"
 *
 * @example
 * ```typescript
 * const helloWorldJson = getHelloWorld();
 * console.log(helloWorldJson);
 * // Output: { text: 'Hello World from Backend!' }
 *
 *
 * @since 1.0.0
 */
function getHelloWorld() {
    return { text: 'Hello World from Backend' };
}
//# sourceMappingURL=greetRoutes.js.map