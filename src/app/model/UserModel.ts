export class UserModel {
  id!: number;
  username!: string;
  firstName!: string;
  middleName!: string;
  lastName!: string;
  email!: string;
  address!: string;
  phone!: string;

  get name(): string {
    return `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''} ${this.lastName ?? ''}`;
  }
}
