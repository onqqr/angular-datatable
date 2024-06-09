export interface IAddUser {
  dob: {
    date: string;
  }
  name: {
    first: string;
    last: string;
  }
  email: string;
}
