import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {User} from "../../../Models/users";
import {UserService} from "../../../Services/user.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIcon,
    ReactiveFormsModule,
    UserDialogComponent // Ensure this component is also stand-alonem

  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','matricule','region','phone','departement', 'edit','delete'];
  dataSource: User[] = []; // This should be your actual data source, possibly fetched from a service

  constructor(public dialog: MatDialog, private userService : UserService) {
    this.userService.getAll().subscribe((data: User[]) => {
      this.dataSource = data;
    });
  }

  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: { user: user ? { ...user } : new User() }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Logic to handle the result from the dialog, e.g., refresh the table
      console.log('Dialog result:', result);
      if (result) {
        window.location.reload();
      }
    });
  }
  delete(user: User){
    this.userService.Delete(user.id).subscribe((data: User) => {
      window.location.reload();
    });
  }
}
