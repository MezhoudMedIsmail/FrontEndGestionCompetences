export class User {
  id!: number;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  department: string;
  phone: string;
  matricule :number ;
  password !: string;
  status !: boolean;
  role !: string;

  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.region = "";
    this.department = "";
    this.phone = "";
    this.matricule = 0;
  }
}
