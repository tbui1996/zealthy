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