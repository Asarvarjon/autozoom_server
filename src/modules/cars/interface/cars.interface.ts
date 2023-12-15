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
    tranmission: string;
    motor: string;
    drive_side: string;
    petrol: string;
    limitPerDay: number;
    deposit: number;
    premium_protection: number;
    price_in_AED: string;
    price_in_USD: string;
    location_id: string;
    created_at: string; // Assuming created_at is a timestamp represented as a string
}

export interface ICreateCar { 
    brand_id: string;
    model_id: string;
    city_id: string;
    color?: string;
    year: string;
    seconds: string;
    max_speed: string;
    max_people: number;
    tranmission: string;
    motor: string;
    drive_side: string;
    petrol: string;
    limitPerDay: number;
    deposit: number;
    premium_protection: number;
    price_in_AED: string;
    price_in_USD: string;
    location_id: string;  
}

