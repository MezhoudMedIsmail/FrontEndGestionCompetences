import { Component } from '@angular/core';
import {TokenService} from "../../Services/token.service";
import {EntryService} from "../../Services/entry.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {User} from "../../Models/users";
import {ErrorsStateMatcher} from "../../Models/ErrorStateMatcher";
import {HttpClientModule} from "@angular/common/http";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatError,
    MatIcon,
    MatFormField,
    MatLabel,
    HttpClientModule,
    MatIconButton,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private entryService: EntryService,
    private tokenStorage: TokenService
  ) {}

  // Error state matcher for form validation
  matcher = new ErrorsStateMatcher();

  // Variable for tracking active form and hide/show password

  hide: boolean = true;
  errorMessage: string = '';

  // Form group with email and password form controls
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  // Getter methods for form controls
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  // Function invoked on form submission
  onSubmit() {
    const LoginInfo = {
      email: this.email?.value,
      password: this.password?.value,
    };
    console.log(LoginInfo);
    if (this.form.valid) {
      this.entryService.signIn(LoginInfo)
        .subscribe({
          next: (data :any) =>{
            this.tokenStorage.saveToken(data.token);
            this.router.navigate(['/Dashboard']);
          },
          error: (err : Error) => {
            this.errorMessage = err.message;
            this._snackBar.open("Identifiants invalides. Veuillez vous assurer d'avoir saisi la bonne adresse e-mail et le bon mot de passe.", '❌');
          }
        });
    } else {
      this._snackBar.open('Enter valid information!!!', '❌');
    }
  }

  // Form group for subscription form with respective form controls
  formSubs: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    department : new FormControl('',[Validators.required]),
    emailSubs: new FormControl('', [Validators.required, Validators.email]),
    passwordSubs: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  // Getter methods for subscription form controls
  get firstName() {
    return this.formSubs.get('firstName');
  }
  get lastName() {
    return this.formSubs.get('lastName');
  }
  get department(){
    return this.formSubs.get('department');
  }
  get emailSubs() {
    return this.formSubs.get('emailSubs');
  }

  get passwordSubs() {
    return this.formSubs.get('passwordSubs');
  }



  SubsInfo : User = new User();
  // Function invoked on subscription form submission
  onSubmitSubs() {
    this.SubsInfo.firstName = this.firstName?.value;
    this.SubsInfo.lastName = this.lastName?.value;
    this.SubsInfo.email = this.emailSubs?.value;
    this.SubsInfo.departement = this.department?.value;
    this.SubsInfo.password = this.passwordSubs?.value;
    console.log(this.formSubs);
    if (this.formSubs.valid) {
      this.entryService.signUp(this.SubsInfo)
        .subscribe({
          next: (data: any) => {
            this.tokenStorage.saveToken(data.token);
            window.location.reload();
          },
          error: (err: Error) => {
            this.errorMessage = err.message;
            this._snackBar.open( "L'email deja existe", '❌');
          }
        });

    } else {
      this._snackBar.open('Enter valid information!!!', '❌');
    }
  }
}
