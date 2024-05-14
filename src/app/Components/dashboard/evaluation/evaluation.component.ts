import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import { QuestionService } from "../../../Services/question.service";
import { Question } from "../../../Models/question";
import { TokenService } from "../../../Services/token.service";
import { UserService } from "../../../Services/user.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

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

  constructor(private questionService: QuestionService, private tokenService: TokenService,
              private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const userId = this.tokenService.getUser();
    this.userService.get(userId).subscribe(user => {
      this.loadQuestions(user.department);
    });
  }

  loadQuestions(department: string): void {
    this.questionService.getThemeByDepartment(department).subscribe(questions => {
      this.questions = questions;
      this.setupForm();
    });
  }

  setupForm(): void {
    const formControls = this.questions.reduce<{ [key: string]: FormControl }>((acc, question) => {
      acc['note' + question.id] = new FormControl('');
      return acc;
    }, {});
    this.evaluationForm = this.fb.group(formControls);
  }

  setResponse(questionId: number, response: string): void {
    this.evaluationForm.controls['note' + questionId].setValue(response);
  }

  submitEvaluation(): void {
    console.log('Form Data:', this.evaluationForm.value);
    // Add submission logic here
  }
}
