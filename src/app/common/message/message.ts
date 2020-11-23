export interface Message {
  idMessage?: number;
  idChat?: number;
  idUser?: number;
  body: string;
}

export declare type Messages = Message[];
