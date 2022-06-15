export interface User {
  id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface DataThrowUser {
  status: number;
  data: User;
}
