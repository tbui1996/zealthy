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
            onSuccess: async (data, variables, context) => {
                // Call the original onSuccess if it exists
                options.onSuccess?.(data, variables, context);

                // Invalidate the config query to trigger a refetch
                queryClient.invalidateQueries(useGetConfigKey);

                // Optionally update the cache directly
                queryClient.setQueryData(useGetConfigKey, data.data);
            },
            onError: (error, variables, context) => {
                // Call the original onError if it exists
                options.onError?.(error, variables, context);

                console.error('Failed to update config:', error);
            }
        }
    );
};

export default useUpdateConfig;