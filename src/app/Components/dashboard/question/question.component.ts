import {Component, OnInit} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ThemeComponent} from "../theme/theme.component";
import {Question} from "../../../Models/question";
import {MatDialog} from "@angular/material/dialog";
import {ThemeService} from "../../../Services/theme.service";
import {QuestionDialogComponent} from "./question-dialog/question-dialog.component";
import {QuestionService} from "../../../Services/question.service";
import {Theme} from "../../../Models/theme";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatFormField,
    MatSelect,
    NgForOf,
    MatOption,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatRowDef,
    MatLabel
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  themes: Theme[] = [];
  dataSource: Question[] = [];
  selectedThemeId: number | undefined;
  displayedColumns: string[] = ['id', 'name', 'text', 'edit', 'delete'];

  constructor(
    public dialog: MatDialog,
    private themeService: ThemeService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getAll().subscribe(data => {
      this.themes = data;
      console.log(data)
    });
  }

  onThemeSelect(themeId: number): void {
    this.selectedThemeId = themeId;
    this.loadQuestionsForTheme(themeId);
  }

  loadQuestionsForTheme(themeId: number): void {
    this.questionService.getQuestionsByTheme(themeId).subscribe(data => {
      this.dataSource = data;
    });
  }

  openDialog(question?: Question): void {
    console.log(this.selectedThemeId)
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '300px',
      data: { question: question ? { ...question } : new Question(), themeId: this.selectedThemeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQuestionsForTheme(this.selectedThemeId as number);
      }
    });
  }

  deleteQuestion(question: Question): void {
    this.questionService.Delete(question.id).subscribe(() => {
      this.loadQuestionsForTheme(this.selectedThemeId as  number);
    });
  }
}

