import { Category } from "./category";

export interface Product{
    id?: number;
    name?: string;
    cost?: number;
    img?: string;
    category: Category;
}