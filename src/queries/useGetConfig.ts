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
            staleTime: 0, // Always consider the data stale
            cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
            retry: 2,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            onError: (error) => {
                console.error('Failed to fetch config:', error);
            }
        }
    );
};

export default useGetConfig;