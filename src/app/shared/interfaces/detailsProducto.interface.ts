import { Producto } from './producto.interface';

// Generated by https://quicktype.io

export interface DetalleProducto {
    id: string;
    description: string;
    quantity: number;
    price_cost: string;
    price_sale: string;
    price_reference: string;
    total: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    state: number;
    synchronized: number;
    order_id: string;
    product_id: string;
    product: Producto;
}
