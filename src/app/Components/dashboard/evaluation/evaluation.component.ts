import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from "../../../Services/question.service";
import { Question } from "../../../Models/question";
import { TokenService } from "../../../Services/token.service";
import { UserService } from "../../../Services/user.service";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { NgForOf } from "@angular/common";
import Swal from 'sweetalert2';
import {Theme} from "../../../Models/theme";

// Define a type for the scores to ensure type safety.
type Scores = {
  EXCELLENT: number;
  GOOD: number;
  OKAY: number;
  NOT_ENOUGH: number;
  NO: number;
};

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel
  ],
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  questions: Question[] = [];
  evaluationForm!: FormGroup;
  theme !: Theme;
  // Pre-defined scores object with strict typing.
  private scoreValues: Scores = { EXCELLENT: 3, GOOD: 2, OKAY: 1, NOT_ENOUGH: -1, NO: -2 };

  constructor(private questionService: QuestionService, private tokenService: TokenService,
              private userService: UserService, private fb: FormBuilder) {
    const userId = this.tokenService.getUser();
    this.userService.get(userId).subscribe(user => {
      this.loadQuestions(user.departement);
    });
  }

  ngOnInit(): void {}

  loadQuestions(department: string): void {
    this.questionService.getThemeByDepartment(department).subscribe(res => {
      this.theme = res;
      this.questions = res.questions;
      this.setupForm();
    });
  }

  setupForm(): void {
    const formControls = this.questions.reduce((acc: { [key: string]: FormControl }, question) => {
      acc['note' + question.id] = new FormControl('');
      return acc;
    }, {});
    this.evaluationForm = this.fb.group(formControls);
  }

  setResponse(questionId: number, response: string): void {
    this.evaluationForm.controls['note' + questionId].setValue(response);
  }

  submitEvaluation(): void {
    const responses = Object.keys(this.evaluationForm.value).map(key => {
      return { idQuestion: parseInt(key.replace('note', '')), reponse: this.evaluationForm.value[key] };
    });

    const score = responses.reduce((acc, { reponse }) => {
      // Ensure that `reponse` is a key of `Scores` using type assertion.
      return acc + (this.scoreValues[reponse as keyof Scores] || 0);
    }, 0);

    if (score < 0) {
      Swal.fire({
        title: "Attention!",
        text: "Il est recommandé de commencer une formation en " + this.theme.title +" .",
        icon: "warning"
      });
    } else {
      Swal.fire({
        title: "Succès!",
        text: "Évaluation positive en " + this.theme.title +" !",
        icon: "success"
      });
    }
    console.log(responses);
    this.questionService.saveReponses(responses ).subscribe(() => {
      //window.location.reload();
    }, (error: any) => {
      Swal.fire({
        title: "Erreur!",
        text: "Problème lors de l'envoi des données.",
        icon: "error"
      });
    });
  }
}
