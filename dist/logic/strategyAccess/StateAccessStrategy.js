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
Object.defineProperty(exports, "__esModule", { value: true });
class StateAccessStrategy {
    constructor(strategy, requestAccess = '', idExp = '') {
        this.strategy = strategy;
        this.requestAccess = requestAccess;
        this.idExp = idExp;
    }
    setStrategyAccess(strategy) {
        this.strategy = strategy;
    }
    setRequestAccess(requestAccess) {
        this.requestAccess = requestAccess;
    }
    setIdExp(idExp) {
        this.idExp = idExp;
    }
    HandlerStrategy(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.strategy) === null || _a === void 0 ? void 0 : _a.handlerAccess(req, res, this.requestAccess, this.idExp));
        });
    }
}
exports.default = StateAccessStrategy;
//# sourceMappingURL=StateAccessStrategy.js.map