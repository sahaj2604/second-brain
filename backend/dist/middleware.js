var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
export function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.json({ message: "not authenticated" });
            }
            const secret = process.env.JWT_SECRET || 'default_secret';
            const isVerified = jwt.verify(token, secret);
            if (!isVerified) {
                return res.json({ message: "not authenticated" });
            }
            //@ts-ignore
            req.id = isVerified.userId;
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
}
