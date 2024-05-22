import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FeedbackDialogComponent} from "../feedback-dialog/feedback-dialog.component";
import {Feedback} from "../../../../Models/feedback";
import {FeedBackService} from "../../../../Services/feed-back.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {Theme} from "../../../../Models/theme";
import {ThemeService} from "../../../../Services/theme.service";
import {ThemeDialogComponent} from "../../theme/theme-dialog/theme-dialog.component";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgForOf} from "@angular/common";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-view-feedback',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLabel,
    MatRow,
    MatRowDef,
    MatTable,
    NgForOf,
    MatHeaderCellDef,
    DatePipe
  ],
  templateUrl: './view-feedback.component.html',
  styleUrl: './view-feedback.component.css'
})
export class ViewFeedbackComponent {
  displayedColumns: string[] = ['id',"titre",'note','date','comment', 'delete'];
  dataSource: Feedback[] = [];

  constructor(public dialog: MatDialog, private feedbackService: FeedBackService) {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.feedbackService.getAll().subscribe(
      (data: Feedback[]) => {
        this.dataSource = data;
        console.log(data)
      }
    );
  }

  openDialog(feedback?: Feedback): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '300px',
      height: '400px',
      data: { feedback: feedback ? { ...feedback } : new Feedback() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchFeedbacks();
      }
    });
  }

  deleteFeedback(feedback: Feedback): void {
    this.feedbackService.Delete(feedback.id).subscribe(() => {
      this.fetchFeedbacks();
    });
  }
}
