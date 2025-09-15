export interface Plan {
  id: number;
  plan_name: string;      
  price: string;           
  stripe_price_id: string;
  createdAt: string;       
}

export interface PlanResponse {
  status: string;
  status_code: number;
  message: string;
  data: Plan[];
}


export interface ActivePlan {
  id: number;
  user: number;      
  plan: number;      
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface UserActivePlan {
  status : string;
  status_code : number;
  message : string;
  data : ActivePlan[];
}

export interface PaymentMethodData {
  id: number;
  payment_method_id: string;
  brand: string;
  last4: string;
  name_on_card: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}
export interface PaymentMethod {
  status: string;
  status_code: number;
  message: string;
  data : PaymentMethodData[]
}
