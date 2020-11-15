export interface User {
    idUser?: number;
    email: string;
    lastname: string;
    firstname: string;
    username: string;
    password?: string;
}

export declare type Users = User[];