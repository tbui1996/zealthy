// mutations/useSaveOnboardingProgress.ts
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient
  } from 'react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../network';
import { useGetOnboardingProgressKey } from '../queries/useGetOnboardingProgress';
import { SaveOnboardingProgressParams, SaveOnboardingProgressResponse } from '../types';  
  
  const useSaveOnboardingProgress = (
    options: UseMutationOptions<
      AxiosResponse<SaveOnboardingProgressResponse>,
      string,
      SaveOnboardingProgressParams
    > = {}
  ): UseMutationResult<
    AxiosResponse<SaveOnboardingProgressResponse>,
    string,
    SaveOnboardingProgressParams
  > => {
    const queryClient = useQueryClient();
  
    return useMutation<
      AxiosResponse<SaveOnboardingProgressResponse>,
      string,
      SaveOnboardingProgressParams
    >(
      ({ userId, progress }) => {
        return axiosInstance.post(`/api/users/${userId}/onboarding-progress`, progress);
      },
      {
        ...options,
        onSuccess: async (data, variables, context) => {
          // Call the original onSuccess if it exists
          options.onSuccess?.(data, variables, context);
          
          // Invalidate the progress query to trigger a refetch
          queryClient.invalidateQueries([useGetOnboardingProgressKey, variables.userId]);
          
          // Optionally update the cache directly
          queryClient.setQueryData(
            [useGetOnboardingProgressKey, variables.userId],
            data
          );
        },
        onError: (error, variables, context) => {
          // Call the original onError if it exists
          options.onError?.(error, variables, context);
          console.error('Failed to save onboarding progress:', error);
        }
      }
    );
  };
  
  export default useSaveOnboardingProgress;