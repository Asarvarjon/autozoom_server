export interface ILocation {
    id: string;
    name: string;
    slug?: string;
    image_src: string;
    text: string;
    created_at: string; // Assuming created_at is a timestamp represented as a string
}

export interface ICreateLocation {
    name: string;
    slug?: string;
    image_src?: string;
    text: string;
}