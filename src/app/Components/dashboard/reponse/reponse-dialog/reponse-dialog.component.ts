import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from "@angular/material/table";
interface QuestionResponse {
  id: number;
  name: string;
  text: string;
  reponse: {
    id: number;
    reponse: string;
  }[];
}
@Component({
  selector: 'app-reponse-dialog',
  standalone: true,
  imports: [
    NgForOf,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatTable
  ],
  templateUrl: './reponse-dialog.component.html',
  styleUrl: './reponse-dialog.component.css'
})
export class ReponseDialogComponent {
  displayedColumns: string[] = ['question', 'response'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { questions: QuestionResponse[] }) {}
}
