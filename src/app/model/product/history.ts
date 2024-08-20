import { User } from "../user/user";
import { InfoPayment } from "./infopayment";
import { Product } from "./product";

export interface HistoryPayment {
    id: number;
    userId?: User;
    productId?: Product;
    numberOrders?: number;
    infoId?: InfoPayment;
}