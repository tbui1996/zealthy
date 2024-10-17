import axiosInstance from "../network";
import { User } from '../types';
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';

export const useGetUserKey = 'get-users';

const useGetUser = (
    id: string,
    options: UseQueryOptions<User, Error> = {}
  ): UseQueryResult<User, Error> =>
    useQuery<User, Error>(
      [useGetUserKey, id],
      async () => (await axiosInstance.get<User>(`/users/${id}`)).data,
      options
    );
  
  export default useGetUser;
