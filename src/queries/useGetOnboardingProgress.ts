import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../network';
import { GetOnboardingProgressResponse } from '../types';



export const useGetOnboardingProgressKey = 'get-onboarding-progress';

const useGetOnboardingProgress = (
  userId: string | null,
  options: UseQueryOptions<AxiosResponse<GetOnboardingProgressResponse>, string> = {}
): UseQueryResult<AxiosResponse<GetOnboardingProgressResponse>, string> => {
  return useQuery<AxiosResponse<GetOnboardingProgressResponse>, string>(
    [useGetOnboardingProgressKey, userId],
    () => axiosInstance.get(`/api/users/${userId}/onboarding-progress`),
    {
      ...options,
      enabled: !!userId,
      staleTime: 1000 * 60, // Consider data stale after 1 minute
      onError: (error) => {
        console.error('Failed to fetch onboarding progress:', error);
        options.onError?.(error);
      }
    }
  );
};

export default useGetOnboardingProgress;