export interface UserToken {
    success: boolean;
    id: number;
    name: string;
    email: string;
    access_token: string;
    token_type: string;
    expires_at: string;
}