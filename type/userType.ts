export interface Reward {
  name: string;
  description: string;
  icon: string;
}

export interface UserData {
  name: string | null;
  email: string;
  profile_pic: string | null; 
  grade: string | null;
  star: number;
  level: number;
  is_premium: boolean;
  reward?: Reward; 
}

export interface UserResponse {
  status: string;      
  status_code: number;  
  message: string;
  data: UserData;
}
