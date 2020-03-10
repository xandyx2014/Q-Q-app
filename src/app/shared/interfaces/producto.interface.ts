// Generated by https://quicktype.io

export interface RespProductos {
    data: Producto[];
    meta: Meta;
}

export interface Producto {
    id: string;
    uid?: string;
    codigo: string;
    trade_name: string;
    generic_name: string;
    description: string;
    price_sale: number;
    price_purchase: number;
    date_created: string;
    date_updated: string;
    state: number;
    cantidad: number;
    images?: Image[];
    type_product_id: string;
    model_id: string;
}
export interface Image {
    id: string;
    url: string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
}

export interface Links {
    next: string;
}
