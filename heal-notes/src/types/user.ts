export type UserJWT = {
  name: string;
  username: string;
  secondname: string | null;
  id: string;
};

export type UserRegistration = {
  username: string;
  name: string;
  secondname?: string;
  password: string;
};

export type UserLogin = {
  username: string;
  password: string;
};
