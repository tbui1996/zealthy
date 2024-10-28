import { useQuery, UseQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../network';
import { PageConfig } from '../types';
import { useGetConfigKey } from '../mutations/useUpdateConfig';

export interface GetConfigResponse {
    success: boolean;
    data?: PageConfig;
    error?: string;
}

const useGetConfig = (): UseQueryResult<AxiosResponse<GetConfigResponse>, string> => {
    return useQuery<AxiosResponse<GetConfigResponse>, string>(
        useGetConfigKey,
        () => axiosInstance.get('/api/admin/config'),
        {
            staleTime: 1000 * 60 * 5, // Consider data stale after 5 minutes
            cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
            retry: 2, // Retry failed requests twice
            onError: (error) => {
                console.error('Failed to fetch config:', error);
            }
        }
    );
};

export default useGetConfig;