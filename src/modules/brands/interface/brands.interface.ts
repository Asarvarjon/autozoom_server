export interface IBrand {
    id: string;
    image_src: string;
    title: string;
    created_at: string; // Assuming created_at is a timestamp represented as a string
}

export interface ICreateBrand {
    image_src?: string;
    title: string;
}
