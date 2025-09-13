import {NextFunction, Request, Response} from "express";
import {auth} from "../config/firebase";

export async function authRequired(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization || "";
        const m = header.match(/^Bearer (.+)$/i);
        if (!m) return res.status(401).json({ error: "missing_token" });
        (req as any).user = await auth.verifyIdToken(m[1]);
        return next();
    } catch (e) {
        return res.status(401).json({ error: "invalid_or_expired_token" });
    }
}