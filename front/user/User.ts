export interface User {
  name: string;
  email: string;
  roles: Role[];
}

export enum Role {
  RESIDENT = 'resident',
  ADMIN = 'admin',
  CHILD = 'child',
}
