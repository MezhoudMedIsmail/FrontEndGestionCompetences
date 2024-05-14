import {User} from "./users";

export class Reponse{
  id!: number;
  reponse: string;
  user: User;

  constructor() {
    this.reponse = "";
    this.user = new User();
  }
}
