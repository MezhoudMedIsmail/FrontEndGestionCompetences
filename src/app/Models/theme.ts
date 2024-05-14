import {Question} from "./question";
import {User} from "./users";

export class Theme {
  id!: number;
  title!: string;
  questions: Question[]=[];
  departement !: string;

  constructor() {
    this.title = "";
    this.departement ="";
  }
}
