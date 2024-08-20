import { User } from "../user/user";

export interface InfoPayment{
    userId: User;
    phone: string;
    address: string
    note: string
    datePayment: string
    status: string
    id: number
}