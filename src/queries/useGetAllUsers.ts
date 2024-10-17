import axiosInstance from "../network";
import { User } from '../types';
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';

export const useGetAllUsersKey = 'get-all-users';

const useGetAllUsers = (
    options: UseQueryOptions<User[], Error> = {}
  ): UseQueryResult<User[], Error> =>
    useQuery<User[], Error>(
      [useGetAllUsersKey],
      async () => (await axiosInstance.get<User[]>(`/users`)).data,
      options
    );
  
export default useGetAllUsers;