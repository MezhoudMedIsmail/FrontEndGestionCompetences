import {Question} from "./question";
import {User} from "./users";

export class Theme {
  id!: number;
  title!: string;
  questions: Question[]=[];
  user:User[]=[];

  constructor() {
    this.title = "";
  }
}
