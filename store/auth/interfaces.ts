// store/auth/interfaces.ts

export interface RegisterProps {
    firstName: string,
    lastName: string,
    phone: string,
    password: string
  }
  
  export interface LoginProps {
    phone: string,
    password: string
  }
  
  export interface AccessTokenProps {
    password: string,
    server: string,
    storage: string,
    username: string
  }
  
  export interface InitialStateProps {
    loading: boolean,
    error: string | null,
    user: object | null,
    success: boolean,
    accessToken: AccessTokenProps | null,
    login: ({ phone, password }: LoginProps) => void,
    register: ({ firstName, lastName, phone, password }: RegisterProps) => void,
    resetStore: () => void,
    logout: () => void
  }
  