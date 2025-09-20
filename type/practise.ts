
export interface AdditionExercisePayload {
  range_value: number;      
  question_number: number;  
  total_correct: number;   
  total_wrong: number;  
}

export interface AdditionMultiplicationDivisionPayload {
  range_value: number[];      
  question_number: number;  
  total_correct: number;   
  total_wrong: number;  
}
