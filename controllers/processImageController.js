"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleImageGen = void 0;
// Handle image request
// POST : api/fetchimages
// PROTECTED
require("dotenv/config");
var src_1 = require("../src");
function main(req) {
    return __awaiter(this, void 0, void 0, function () {
        var amount, imageUrl, prompt, client, clientIFS, Imagine, U1, U2, _a, U3, _b, U4, _c, saveid, swapid1, swapid2, _d, swapid3, _e, swapid4, _f, urls, urls, urls, url;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    amount = req.amount, imageUrl = req.imageUrl, prompt = req.prompt;
                    console.log("This is amount in main", amount);
                    console.log("This is imageUrl in main", imageUrl);
                    console.log("This is prompt in main", prompt);
                    client = new src_1.Midjourney({
                        ServerId: process.env.SERVER_ID,
                        ChannelId: process.env.CHANNEL_ID,
                        SalaiToken: process.env.SALAI_TOKEN,
                        Debug: true,
                        Ws: true,
                    });
                    clientIFS = new src_1.IFS({
                        ServerId: process.env.SERVER_ID,
                        ChannelId: process.env.CHANNEL_ID,
                        SalaiToken: process.env.SALAI_TOKEN,
                        BotId: src_1.IFSBot,
                        Debug: true,
                    });
                    return [4 /*yield*/, client.Connect()];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, client.Imagine(prompt, function (uri, progress) {
                            console.log("Imagine loading", uri, "progress", progress);
                        })];
                case 2:
                    Imagine = _g.sent();
                    if (!Imagine) {
                        console.log("No image returned from Imagine.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, client.Upscale({
                            index: 1,
                            msgId: Imagine.id,
                            hash: Imagine.hash,
                            flags: Imagine.flags,
                            content: Imagine.content,
                            loading: function (uri, progress) {
                                console.log("loading", uri, "progress", progress);
                            },
                        })];
                case 3:
                    U1 = _g.sent();
                    if (!amount.includes("2")) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.Upscale({
                            index: 2,
                            msgId: Imagine.id,
                            hash: Imagine.hash,
                            flags: Imagine.flags,
                            content: Imagine.content,
                            loading: function (uri, progress) {
                                console.log("loading", uri, "progress", progress);
                            },
                        })];
                case 4:
                    _a = _g.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _a = null;
                    _g.label = 6;
                case 6:
                    U2 = _a;
                    if (!amount.includes("3")) return [3 /*break*/, 8];
                    return [4 /*yield*/, client.Upscale({
                            index: 3,
                            msgId: Imagine.id,
                            hash: Imagine.hash,
                            flags: Imagine.flags,
                            content: Imagine.content,
                            loading: function (uri, progress) {
                                console.log("loading", uri, "progress", progress);
                            },
                        })];
                case 7:
                    _b = _g.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _b = null;
                    _g.label = 9;
                case 9:
                    U3 = _b;
                    if (!amount.includes("4")) return [3 /*break*/, 11];
                    return [4 /*yield*/, client.Upscale({
                            index: 4,
                            msgId: Imagine.id,
                            hash: Imagine.hash,
                            flags: Imagine.flags,
                            content: Imagine.content,
                            loading: function (uri, progress) {
                                console.log("loading", uri, "progress", progress);
                            },
                        })];
                case 10:
                    _c = _g.sent();
                    return [3 /*break*/, 12];
                case 11:
                    _c = null;
                    _g.label = 12;
                case 12:
                    U4 = _c;
                    if (!U1) {
                        console.log("No response from Upscale.");
                        return [2 /*return*/];
                    }
                    console.log("U1", { U1: U1 });
                    console.log("U2", { U2: U2 });
                    console.log("U3", { U3: U3 });
                    console.log("U4", { U4: U4 });
                    return [4 /*yield*/, clientIFS.Connect()];
                case 13:
                    _g.sent();
                    return [4 /*yield*/, clientIFS.SaveId(imageUrl, function (uri) {
                            console.log("loading123---", uri);
                        })];
                case 14:
                    saveid = _g.sent();
                    if (!saveid) {
                        console.log("No response returned from saveid.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, clientIFS.SwapId(U1.uri, saveid.rid, function (uri) {
                            console.log("loading123---", uri);
                        })];
                case 15:
                    swapid1 = _g.sent();
                    if (!swapid1) {
                        console.log("No response returned from saveid.");
                        return [2 /*return*/];
                    }
                    if (!U2) return [3 /*break*/, 17];
                    return [4 /*yield*/, clientIFS.SwapId(U2.uri, saveid.rid, function (uri) {
                            console.log("loading123---", uri);
                        })];
                case 16:
                    _d = _g.sent();
                    return [3 /*break*/, 18];
                case 17:
                    _d = null;
                    _g.label = 18;
                case 18:
                    swapid2 = _d;
                    if (!U3) return [3 /*break*/, 20];
                    return [4 /*yield*/, clientIFS.SwapId(U3.uri, saveid.rid, function (uri) {
                            console.log("loading123---", uri);
                        })];
                case 19:
                    _e = _g.sent();
                    return [3 /*break*/, 21];
                case 20:
                    _e = null;
                    _g.label = 21;
                case 21:
                    swapid3 = _e;
                    if (!U4) return [3 /*break*/, 23];
                    return [4 /*yield*/, clientIFS.SwapId(U4.uri, saveid.rid, function (uri) {
                            console.log("loading123---", uri);
                        })];
                case 22:
                    _f = _g.sent();
                    return [3 /*break*/, 24];
                case 23:
                    _f = null;
                    _g.label = 24;
                case 24:
                    swapid4 = _f;
                    return [4 /*yield*/, clientIFS.delId(saveid.rid)];
                case 25:
                    _g.sent();
                    console.log("idname", saveid.rid, "has been deleted");
                    client.Close();
                    clientIFS.Close();
                    if (swapid2 && !swapid3 && !swapid4) {
                        urls = [swapid1.proxy_url, swapid2.proxy_url];
                        return [2 /*return*/, urls];
                    }
                    if (swapid2 && swapid3 && !swapid4) {
                        urls = [swapid1.proxy_url, swapid2.proxy_url, swapid3.proxy_url];
                        return [2 /*return*/, urls];
                    }
                    if (swapid2 && swapid3 && swapid4) {
                        urls = [swapid1.proxy_url, swapid2.proxy_url, swapid3.proxy_url, swapid4.proxy_url];
                        return [2 /*return*/, urls];
                    }
                    url = [swapid1.proxy_url];
                    return [2 /*return*/, url];
            }
        });
    });
}
var handleImageGen = function (req, res, next) {
    //console.log("This is the request in handleimageGen", req);
    main(req.body)
        .then(function (value) {
        console.log("This is the value", value);
        res.json(value);
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).send(err.message);
    });
};
exports.handleImageGen = handleImageGen;
