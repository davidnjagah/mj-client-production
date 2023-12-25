"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var authMiddleware_1 = require("./middleware/authMiddleware");
var processImageController_1 = require("./controllers/processImageController");
var paystack_webhook_1 = require("./controllers/paystack-webhook");
var check_1 = require("./controllers/check");
var errorMiddleware_1 = require("./middleware/errorMiddleware");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/api/fetchimages', authMiddleware_1.default, processImageController_1.handleImageGen);
app.use('/api/webhook', paystack_webhook_1.paystackWebhook);
app.use('/api/checkroute', check_1.check);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(5000, function () { return console.log("Server running on port 5000"); });
exports.default = app;
