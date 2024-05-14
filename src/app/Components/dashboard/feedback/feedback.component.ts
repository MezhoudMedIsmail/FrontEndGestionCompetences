import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {NgForOf} from "@angular/common";
import {FeedBackService} from "../../../Services/feed-back.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-feedback',
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
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder , private feedBackService : FeedBackService,private _snackBar: MatSnackBar) {
    this.feedbackForm = this.fb.group({
      comment: ['', Validators.required],
      note: ['', Validators.required],
      date: ['', Validators.required],
      title_formation: ['', Validators.required]
    });
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      console.log('Feedback Data:', this.feedbackForm.value);
      this.feedBackService.Create(this.feedbackForm.value).subscribe({
        next: (res) => {
          console.log('Feedback created successfully');
          this._snackBar.open('the feedback has been successfully saved!', '✅');
          setTimeout(() => {
            window.location.reload();

          }, 2000);
        },
        error: (err) => {
          console.error('Error creating feedback:', err);
        }
      });
    }
  }
}
