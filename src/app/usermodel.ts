export interface User {
    id: number;
    loginstatus: boolean;
    username: string;
    email: string;
    password: string;
    firstName: string;
    token?: string;
    loginTime: string;
}
