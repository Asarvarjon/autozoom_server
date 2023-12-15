export interface ICreateOtp {
    code: number;
    user_id: string;
  }
  
  export interface IConfirmOtp {
    code: number;
    phone_number: string;
  }
  
  export interface IOtp {
    otp_id: string;
    user_id: string;
    code: string;
    created_at: Date;
    expires_at: Date;
    is_active: string;
  }

  export interface IResendOtp {
    phone_number: string;
  }
  