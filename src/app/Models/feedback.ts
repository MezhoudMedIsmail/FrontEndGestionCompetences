export class Feedback{
  id !: number;
  comment !: string;
  note !: string;
  date !: string;
  title_formation !: string;
  constructor() {
    this.comment = "";
    this.note = "";
    this.date = "";
    this.title_formation = "";
  }
}
