export class User {
  id!: number;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  departement: string;
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
    this.departement = "";
    this.phone = "";
    this.matricule = 0;
  }
}
