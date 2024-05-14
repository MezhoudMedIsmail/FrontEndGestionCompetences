import { Component, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {User} from "../../../../Models/users";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../../../Services/user.service";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButton,
        MatOption,
        MatSelect
    ]
})
export class UserDialogComponent {
  userForm: FormGroup;
  departments = ['IT', 'RH', 'SEC'];  // This array can be fetched from the server if needed

  constructor(
    private userService : UserService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(data.user.id),
      firstName: new FormControl(data.user.firstName),
      lastName: new FormControl(data.user.lastName),
      email: new FormControl(data.user.email),
      role: new FormControl(data.user.role),
      password: new FormControl(data.user.password),
      matricule: new FormControl(data.user.matricule),
      region : new FormControl(data.user.region),
      departement : new FormControl(data.user.departement),
      phone : new FormControl(data.user.phone),
      // Include other fields as necessary
    });
  }

  onSave(): void {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      if(this.userForm.value.id){
        this.userService.Update(this.userForm.value.id,this.userForm.value).subscribe((data: User) => {
          this.dialogRef.close(data);
        });
      }else{
        this.userService.Create(this.userForm.value).subscribe((data: User) => {
          this.dialogRef.close(data);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
