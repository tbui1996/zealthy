export interface User {
    id: string;
    email: string;
    aboutMe?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    birthdate?: string;
  }


export interface CreateUserRequest {
    email: string;
    password: string;
    aboutMe?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    birthdate?: string;
}

export interface DataTableProps {
    userId: string;
}

export interface UpdateUserRequest {
    id: string;
    email?: string;
    password?: string;
    aboutMe?: string | null;
    address?: {
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zip?: string | null;
    } | null;
    birthdate?: string | null;
  }

  export interface PageConfig {
    [key: number]: string[];
  }
  
export interface ApiResponse {
    success: boolean;
    data?: PageConfig;
    error?: string;
  }



export interface OnboardingProgress {
    currentStep: number;
    stepData: {
      [key: string]: any;
    };
    completed: boolean;
    lastUpdated: Date;
  }
  
export interface GetOnboardingProgressResponse {
    success: boolean;
    data?: OnboardingProgress;
    error?: string;
  }

  export interface SaveOnboardingProgressResponse {
    success: boolean;
    data?: OnboardingProgress;
    error?: string;
  }
  
  export interface SaveOnboardingProgressParams {
    userId: string;
    progress: Omit<OnboardingProgress, 'lastUpdated'>;
}