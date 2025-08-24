export interface UserData {
  name: string;
  email: string;
  profile_pic: string | null;
}

export interface UserResponse {
  success: boolean;
  message: string;
  status: number;
  data: UserData;
}


