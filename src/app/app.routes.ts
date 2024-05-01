import { Routes } from '@angular/router';
import {LoginComponent} from "./Components/login/login.component";
import {SecureInnerPagesGuard} from "./Guard/secure-inner-pages.guard";
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {AuthGuard} from "./Guard/auth.guard";
import {ProfileComponent} from "./Components/dashboard/profile/profile.component";
import {EvaluationComponent} from "./Components/dashboard/evaluation/evaluation.component";
import {FeedbackComponent} from "./Components/dashboard/feedback/feedback.component";
import {QuestionComponent} from "./Components/dashboard/question/question.component";
import {ThemeComponent} from "./Components/dashboard/theme/theme.component";
import {UsersComponent} from "./Components/dashboard/users/users.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent},
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      { path: 'evaluation', component: EvaluationComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'theme', component: ThemeComponent },
      { path: 'users', component: UsersComponent},
      { path: '', redirectTo: 'theme', pathMatch: 'full' },
      {
        path : 'Profile' ,
        component : ProfileComponent,
      }
    ]
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login", pathMatch: "full" }

];
