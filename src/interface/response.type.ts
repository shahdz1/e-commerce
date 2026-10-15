import { ListResponse } from "../interface/listResponse.interface";
import { Category } from "./category.interface";
import { IProduct } from "./product.interface";
export type categoryResponse = ListResponse<Category>;
export type productResponse = ListResponse<IProduct>;
