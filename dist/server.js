"use strict";
/**
 *   File: server.ts
 *
 *   Purpose: this file contains the main code for the back-end server
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = __importDefault(require("express"));
const greetRoutes_1 = __importDefault(require("./routes/greetRoutes"));
const app = (0, express_1.default)();
const port = 3001;
// Create a route
app.use("/api/greet", greetRoutes_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://127.0.0.1:${port}`);
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
//# sourceMappingURL=server.js.map