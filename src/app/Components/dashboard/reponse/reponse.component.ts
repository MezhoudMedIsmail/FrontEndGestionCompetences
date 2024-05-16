import {Component, OnInit} from '@angular/core';
import {Theme} from "../../../Models/theme";
import {Question} from "../../../Models/question";
import {MatDialog} from "@angular/material/dialog";
import {ThemeService} from "../../../Services/theme.service";
import {QuestionService} from "../../../Services/question.service";
import {ReponseDialogComponent} from "./reponse-dialog/reponse-dialog.component";
import {User} from "../../../Models/users";
import {EChartsOption} from 'echarts';
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
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
import {MatIcon} from "@angular/material/icon";

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
    MatLabel,
    MatIcon,
    NgxEchartsDirective
  ],
  providers: [provideEcharts()],
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {
  themes: Theme[] = [];
  dataSource: Question[] = [];
  selectedThemeId: number | undefined;
  displayedColumns: string[] = ['id', 'name', 'lastname', 'response'];
  userList: User[] = [];

  responseCounts: any = {
    EXCELLENT: 0,
    GOOD: 0,
    OKAY: 0,
    NOT_ENOUGH: 0,
    NO: 0
  };

  option: EChartsOption = {
    title: {
      text: 'Statistique des reponses selon them ',
      subtext: 'Theme : ' + this.themes.find(theme => theme.id === this.selectedThemeId)?.title ? this.themes.find(theme => theme.id === this.selectedThemeId)?.title : '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: this.responseCounts.EXCELLENT, name: 'EXCELLENT' },
          { value: this.responseCounts.GOOD, name: 'GOOD' },
          { value: this.responseCounts.OKAY, name: 'OKAY' },
          { value: this.responseCounts.NOT_ENOUGH, name: 'NOT_ENOUGH' },
          { value: this.responseCounts.NO, name: 'NO' },
        ],
      },
    ],
  };

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
      this.calculateResponseCounts();
    });
  }

  openResponsesDialog(userId: number): void {
    const filteredQuestions = this.dataSource.filter(question =>
      question.reponse.some((response) => response.user.id === userId)
    );

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
    });
  }

  extractUsers() {
    if (this.selectedThemeId) {
      this.questionService.getUsersByTheme(this.selectedThemeId).subscribe((data: User[]) => {
        this.userList = data;
      });
    }
  }

  calculateResponseCounts() {
    this.responseCounts = {
      EXCELLENT: 0,
      GOOD: 0,
      OKAY: 0,
      NOT_ENOUGH: 0,
      NO: 0
    };

    this.dataSource.forEach(question => {
      question.reponse.forEach(response => {
        if (this.responseCounts.hasOwnProperty(response.reponse)) {
          this.responseCounts[response.reponse]++;
        }
      });
    });

    this.updateChart();
  }

  updateChart() {
    const totalResponses = Object.values(this.responseCounts).reduce((acc : number, count :any) => acc + count, 0);

    if (this.option && this.option.series) {
      this.option= {
        title: {
          text: 'Statistique des reponses selon them ',
          subtext: 'Theme : ' + this.themes.find(theme => theme.id === this.selectedThemeId)?.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data:  [
              { value: Number(((this.responseCounts.EXCELLENT / totalResponses) * 100).toFixed(2)), name: 'EXCELLENT' },
              { value: Number(((this.responseCounts.GOOD / totalResponses) * 100).toFixed(2)), name: 'GOOD' },
              { value: Number(((this.responseCounts.OKAY / totalResponses) * 100).toFixed(2)), name: 'OKAY' },
              { value: Number(((this.responseCounts.NOT_ENOUGH / totalResponses) * 100).toFixed(2)), name: 'NOT_ENOUGH' },
              { value: Number(((this.responseCounts.NO / totalResponses) * 100).toFixed(2)), name: 'NO' },
            ],
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }
  }
}
