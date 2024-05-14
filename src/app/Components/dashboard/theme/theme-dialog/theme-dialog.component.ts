import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../../Services/user.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {UserDialogComponent} from "../../users/user-dialog/user-dialog.component";
import {Theme} from "../../../../Models/theme";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {ThemeService} from "../../../../Services/theme.service";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-theme-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './theme-dialog.component.html',
  styleUrl: './theme-dialog.component.css'
})
export class ThemeDialogComponent {
  themeForm: FormGroup;
  departments = ['IT', 'RH', 'SEC'];  // This array can be fetched from the server if needed

  constructor(
    private themeService: ThemeService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { theme: Theme }
  ) {
    this.themeForm = new FormGroup({
      id: new FormControl(data.theme.id),
      title: new FormControl(data.theme.title),
      questions: new FormControl(data.theme.questions),
      departement: new FormControl(data.theme.departement),
      // Include other fields as necessary
    });
  }

  onSave(): void {
    console.log(this.themeForm.value);
    if (this.themeForm.valid) {
      if (this.themeForm.value.id) {
        this.themeService.Update(this.themeForm.value.id, this.themeForm.value).subscribe((data: any) => {
          this.dialogRef.close(data);
        });
      } else {
        this.themeService.Create(this.themeForm.value).subscribe((data: any) => {
          this.dialogRef.close(data);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
