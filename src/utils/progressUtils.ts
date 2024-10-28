export interface UserProgress {
    userId: string;
    currentStep: number;
    completedSteps: number[];
  }
  
  export const saveProgress = (progress: UserProgress) => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  };
  
  export const getProgress = (): UserProgress | null => {
    const progress = localStorage.getItem('userProgress');
    return progress ? JSON.parse(progress) : null;
  };
  
  export const clearProgress = () => {
    localStorage.removeItem('userProgress');
  };