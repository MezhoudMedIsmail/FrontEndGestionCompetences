import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Feedback} from "../../../../Models/feedback";
import {FeedBackService} from "../../../../Services/feed-back.service";
import { MatSelectModule} from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {UserDialogComponent} from "../../users/user-dialog/user-dialog.component";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,

    NgForOf,
  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css'
})
export class FeedbackDialogComponent {
  feedbackForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { feedback: Feedback ; },
    private feedbackService: FeedBackService
  ) {
    this.feedbackForm = new FormGroup({
      id: new FormControl(this.data.feedback?.id),
      title_formation: new FormControl(this.data.feedback?.title_formation),
      comment: new FormControl(this.data.feedback?.comment),
      note: new FormControl(this.data.feedback?.note),
      date: new FormControl(this.data.feedback?.date)
    });
  }

  onSave(): void {
    const feedbackData = this.feedbackForm.value;
    if (this.data.feedback.id) {
      this.feedbackService.Update(this.data.feedback?.id,feedbackData).subscribe({
        next: (result) => this.dialogRef.close(result),
        error: (error) => console.error('Error updating question:', error)
      });
    } else {
      this.feedbackForm.value.date = new Date();
      this.feedbackService.Create(feedbackData).subscribe({
        //make date in form value is set today
        next: (result) => this.dialogRef.close(result),
        error: (error) => console.error('Error adding question:', error)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
