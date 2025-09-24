export interface ProgressResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    progress_today: {
      practice_time_minutes: number;
      stars_earned: number;
      best_challenge_score: number;
      daily_goal_progress: number;
    };
    recent_activities: {
      stars: number;
      description: string;
      created_at: string; 
    }[];
    recent_activities_count: number;
  };
}
