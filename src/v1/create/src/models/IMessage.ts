export interface IMessage {
  type: string;
  userId: string;
}

export interface ISignupMessage extends IMessage {
  firstName: string;
  lastName: string;
}
