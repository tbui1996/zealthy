export interface User {
    id: string;
    email: string;
    aboutMe?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    birthdate?: string;
  }


export interface CreateUserRequest {
    email: string;
    password: string;
    aboutMe?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    birthdate?: string;
}

export interface DataTableProps {
    userId: string;
}

export interface UpdateUserRequest {
    id: string;
    email?: string;
    password?: string;
    aboutMe?: string | null;
    address?: {
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zip?: string | null;
    } | null;
    birthdate?: string | null;
  }