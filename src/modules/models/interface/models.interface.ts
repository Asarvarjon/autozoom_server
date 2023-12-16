export interface IModel {
    id: string;
    name: string;
    slug?: string;
    brand_id: string;
    created_at: string; // Assuming created_at is a timestamp represented as a string
}

export interface ICreateModel {
    name: string;
    slug?: string;
    brand_id: string;
}