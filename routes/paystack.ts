import { Router } from 'express';
import { paystackWebhook } from '../controllers/paystack-webhook';

const paystack = Router();

paystack.post('/', paystackWebhook);

export default paystack;
