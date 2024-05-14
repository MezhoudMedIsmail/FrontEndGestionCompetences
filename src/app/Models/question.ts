import {Reponse} from "./Reponse";

  export class Question {
  id!: number;
  name: string;
  text: string;
  reponse: Reponse[];

  constructor() {
    this.name = "";
    this.text = "";
    this.reponse = [];
  }
}
