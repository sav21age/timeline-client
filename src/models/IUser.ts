export interface IUser {
    id: string;
    username: string;
    email: string;
}

export interface ISignIn {
    user: IUser;
    accessToken: string;
}

