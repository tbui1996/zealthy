import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient
} from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '../network';
import { User, UpdateUserRequest } from '../types';
import { useGetUserKey } from '../queries/useGetUser';

export const useUpdateUserKey = 'update-user';

const useUpdateUser = (
    options: UseMutationOptions<
        AxiosResponse<User>,
        AxiosError,
        UpdateUserRequest
    > = {}
): UseMutationResult<AxiosResponse<User>, AxiosError, UpdateUserRequest> => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<User>, AxiosError, UpdateUserRequest>(
        (request) => {
            const { id, ...updateData } = request;
            return axiosInstance.put(`/user/${id}`, updateData);
        },
        {
            ...options,
            onSuccess: async (data, variables, context) => {
                options.onSuccess?.(data, variables, context);
                queryClient.invalidateQueries(useGetUserKey);
                queryClient.invalidateQueries(useUpdateUserKey);
            },
            onError: (error: AxiosError) => {
                console.error('Error updating user:', error.response?.data || error.message);
            }
        }
    );
};

export default useUpdateUser;