import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Question} from "../../../../Models/question";
import {QuestionService} from "../../../../Services/question.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-question-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatDialogTitle,
    MatDialogContent,
    MatLabel
  ],
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.css'
})
export class QuestionDialogComponent {
  questionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: Question; themeId: number },
    private questionService: QuestionService
  ) {
    this.questionForm = new FormGroup({
      id: new FormControl(this.data.question?.id),
      name: new FormControl(this.data.question?.name),
      text: new FormControl(this.data.question?.text)
    });
  }

  onSave(): void {
    const questionData = { ...this.questionForm.value, themeId: this.data.themeId };
    if (this.data.question.id) {
      this.questionService.Update(this.data.question?.id,questionData).subscribe({
        next: (result) => this.dialogRef.close(result),
        error: (error) => console.error('Error updating question:', error)
      });
    } else {
      this.questionService.createQuestion(this.data.themeId,questionData).subscribe({
        next: (result) => this.dialogRef.close(result),
        error: (error) => console.error('Error adding question:', error)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

