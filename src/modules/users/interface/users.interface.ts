
export interface IUser {
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    is_active: Boolean;
    created_at: Date;
    updated_at: Date;
}


export interface ICreateUser { 
    first_name: string; 
    phone_number: string;  
    last_name: string;
    password?: string;
}

export interface IUpdateUser { 
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface ICreateTempPassword { 
    user_id: string;
    password: string;
}