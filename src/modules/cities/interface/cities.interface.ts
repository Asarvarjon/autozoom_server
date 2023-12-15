export interface ICity {
    id: string;
    name: string;
    slug: string;
    created_at: string; // Assuming created_at is a timestamp represented as a string
}

export interface ICreateCity {
    name: string;
    slug: string;
}