import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient
} from 'react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../network';
import { User } from '../types';
import { useGetUserKey } from '../queries/useGetUser';
import { CreateUserRequest } from '../types';

export const useCreateUserKey = 'create-user';

const useCreateUser = (
    options: UseMutationOptions<
        AxiosResponse<User>,
        string,
        CreateUserRequest
    > = {}
): UseMutationResult<AxiosResponse<User>, string, CreateUserRequest> => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<User>, string, CreateUserRequest>(
        (request) => {
            console.log('what is request: ', request)
            return axiosInstance.post('/user', request);
        },
        {
            ...options,
            onSuccess: async (data, variables, context) => {
                options.onSuccess?.(data, variables, context);
                queryClient.invalidateQueries(useGetUserKey);
                
            }
        }
    );
};

export default useCreateUser;