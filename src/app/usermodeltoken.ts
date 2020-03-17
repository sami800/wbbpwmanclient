export interface UserToken {
    user: {
    id: number;
    loginstatus: boolean;
    username: string;
    email: string;
    password: string;
    firstName: string;
    token?: string;
    loginTime: string;
    }
}