
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




export interface ChallengeTopScore {
  practice_type: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION" | string;
  challenge_type: "NO_MISTAKE" | "SPEED_MODE" | "100_QUESTIONS" | "WHATS_MISSING" | string;
  challenge_name: string;
  score: number;
  time: number;
  display_top_score: string;
}

export interface ChallengeTopScoresResponse {
  status: string;
  status_code: number;
  message: string;
  data: ChallengeTopScore[];
}

