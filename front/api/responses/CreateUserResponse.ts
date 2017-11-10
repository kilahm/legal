import {isUser, User} from '../User';

export interface CreateUserResponse {
  user: User;
}
export function isCreateUserResponse(subject: any): subject is CreateUserResponse {
  return typeof subject === 'object' && isUser(subject.user);
}
