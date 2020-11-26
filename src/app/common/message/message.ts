export interface Message {
    idMessage?: number;
    idChat?: number;
    idPlanning?: number;
    body: string;
}

export declare type Messages = Message[];
