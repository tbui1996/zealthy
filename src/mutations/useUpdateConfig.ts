import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient
} from 'react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../network';
import { PageConfig } from '../types';

export const useGetConfigKey = 'get-config';
export const useUpdateConfigKey = 'update-config';

export interface UpdateConfigResponse {
    success: boolean;
    data?: PageConfig;
    error?: string;
}

const useUpdateConfig = (
    options: UseMutationOptions<
        AxiosResponse<UpdateConfigResponse>,
        string,
        PageConfig
    > = {}
): UseMutationResult<AxiosResponse<UpdateConfigResponse>, string, PageConfig> => {
    const queryClient = useQueryClient();
    
    return useMutation<AxiosResponse<UpdateConfigResponse>, string, PageConfig>(
        (config) => {
            return axiosInstance.post('/api/admin/config', config);
        },
        {
            ...options,
            onMutate: async (newConfig) => {
                // Cancel any outgoing refetches to avoid optimistic update overwrite
                await queryClient.cancelQueries(useGetConfigKey);

                // Save the previous value
                const previousConfig = queryClient.getQueryData(useGetConfigKey);

                // Optimistically update the cache
                queryClient.setQueryData(useGetConfigKey, (old: any) => ({
                    ...old,
                    data: {
                        success: true,
                        data: newConfig
                    }
                }));

                return { previousConfig };
            },
            onSuccess: async (data, variables, context) => {
                // Call the original onSuccess if it exists
                options.onSuccess?.(data, variables, context);
                
                // Force a refetch to ensure cache is up to date
                queryClient.removeQueries(useGetConfigKey);
                queryClient.prefetchQuery(useGetConfigKey, () => 
                    axiosInstance.get('/api/admin/config')
                );
            },
            onError: (error, variables, context: any) => {
                // Revert to previous value on error
                if (context?.previousConfig) {
                    queryClient.setQueryData(useGetConfigKey, context.previousConfig);
                }
                
                options.onError?.(error, variables, context);
                console.error('Failed to update config:', error);
            },
            onSettled: () => {
                // Always refetch after error or success
                queryClient.invalidateQueries(useGetConfigKey);
            }
        }
    );
};

export default useUpdateConfig;