export interface UserData {
  name: string | null;
  email: string;
  profile_pic: File | null;
  grade: string | null;
  star: number;
  level: number;
  is_premium: boolean;
}

export interface UserResponse {
  success: boolean;
  message: string;
  status: number;
  data: UserData;
}
