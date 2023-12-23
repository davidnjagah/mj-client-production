import { Request, Response, NextFunction } from 'express';

// Handle paystack payment confirmation
// POST : api/webhook
// PROTECTED //Whitelisting.
import "dotenv/config";

export const paystackWebhook = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        console.log(req);
        res.json("Webhook Success");
}