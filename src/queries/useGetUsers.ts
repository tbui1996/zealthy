import axiosInstance from "../network";
import { User } from '../types';
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';

export const useGetUsersKey = 'get-users';

const useGetUsers = (
  options: UseQueryOptions<User[], Error> = {}
    ): UseQueryResult<User[], Error> =>
    useQuery<User[], Error>(
        useGetUsersKey,
        async () => (await axiosInstance.get<User[]>('/api/users')).data,
        options
);


export default useGetUsers;
