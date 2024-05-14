import {Component, OnInit} from '@angular/core';
import {Theme} from "../../../Models/theme";
import {Question} from "../../../Models/question";
import {MatDialog} from "@angular/material/dialog";
import {ThemeService} from "../../../Services/theme.service";
import {QuestionService} from "../../../Services/question.service";
import {QuestionDialogComponent} from "../question/question-dialog/question-dialog.component";
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
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {ReponseDialogComponent} from "./reponse-dialog/reponse-dialog.component";
import {User} from "../../../Models/users";

@Component({
  selector: 'app-reponse',
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
  templateUrl: './reponse.component.html',
  styleUrl: './reponse.component.css'
})
export class ReponseComponent implements OnInit{
  themes: Theme[] = [];
  dataSource: Question[] = [];
  selectedThemeId: number | undefined;
  displayedColumns: string[] = ['id', 'name', 'lastname', 'response'];
  userList : User[]=[];

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
    });
  }

  onThemeSelect(themeId: number): void {
    this.selectedThemeId = themeId;
    this.loadQuestionsForTheme(themeId);
  }

  loadQuestionsForTheme(themeId: number): void {
    this.questionService.getQuestionsByTheme(themeId).subscribe(data => {
      this.dataSource = data;
      this.extractUsers();
      console.log(data)
    });
  }
  openResponsesDialog(userId : number): void {
    // Filter the data to include only those questions where the user has responded
    const filteredQuestions = this.dataSource.filter(question =>
      question.reponse.some((response) => response.user.id === userId)
    );

    // Now, further filter the responses inside each question to include only those from the specific user
    const dataForDialog = filteredQuestions.map(question => ({
      ...question,
      reponse: question.reponse.filter(response => response.user.id === userId)
    }));

    const dialogRef = this.dialog.open(ReponseDialogComponent, {
      width: '400px',
      data: { questions: dataForDialog }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optional: Refresh or handle data after dialog closes
    });
  }


  extractUsers() {
      this.questionService.getUsersByTheme(this.selectedThemeId as number).subscribe((data: User[]) => {
        this.userList = data;
        console.log(data)
      });

  }

}
