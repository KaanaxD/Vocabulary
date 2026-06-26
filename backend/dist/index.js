"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const auth_route_1 = require("./routes/auth.route");
const errorHandler_1 = require("./middlewares/errorHandler");
const vocab_route_1 = require("./routes/vocab.route");
const auth_1 = require("./middlewares/auth");
const cors_1 = __importDefault(require("cors"));
const category_route_1 = require("./routes/category.route");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173"
}));
app.use("/api/auth", auth_route_1.authRouter);
app.use("/api/vocab", auth_1.auth, vocab_route_1.vocabRouter);
app.use("/api/category", auth_1.auth, category_route_1.categoryRouter);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map