export interface ICar {
    id: string;
    brand_id: string;
    model_id: string;
    city_id: string;
    color?: string;
    year: string;
    seconds: string;
    max_speed: string;
    max_people: number;
    transmission: string;
    motor: string;
    drive_side: string;
    petrol: string;
    limitperday: number;
    deposit: number;
    premium_protection: number;
    price_in_aed: string;
    price_in_usd: string;
    price_in_aed_sale: string;
    price_in_usd_sale: string;
    category_id: string; 
    location_id: string;
    inclusive: boolean;
    created_at: string; // Assuming created_at is a timestamp represented as a string
}

export interface ICreateCar { 
    brand_id: string;
    inclusive: boolean;
    model_id: string;
    category_id: string;
    city_id: string;
    color?: string;
    year: string;
    seconds: string;
    max_speed: string;
    max_people: number;
    transmission: string;
    motor: string;
    drive_side: string;
    petrol: string;
    limitperday: number;
    deposit: number;
    premium_protection: number;
    price_in_aed: string;
    price_in_usd: string;
    location_id: string;  
    price_in_aed_sale: string;
    price_in_usd_sale: string;
}

