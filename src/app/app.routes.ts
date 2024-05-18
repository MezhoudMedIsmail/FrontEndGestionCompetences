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
import {ReponseComponent} from "./Components/dashboard/reponse/reponse.component";
import {ViewFeedbackComponent} from "./Components/dashboard/feedback/view-feedback/view-feedback.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {
    path: 'Dashboard',
    component: DashboardComponent,canActivate : [AuthGuard],
    children: [
      { path: 'evaluation', component: EvaluationComponent ,canActivate : [AuthGuard]},
      { path: 'feedback', component: FeedbackComponent ,canActivate : [AuthGuard]},
      { path: 'feedbacks', component: ViewFeedbackComponent ,canActivate : [AuthGuard]},
      { path: 'question', component: QuestionComponent ,canActivate : [AuthGuard]},
      { path: 'theme', component: ThemeComponent ,canActivate : [AuthGuard]},
      { path: 'users', component: UsersComponent,canActivate : [AuthGuard],
        data:{
          role: ['ADMIN']
        }
      },

      { path: 'reponse', component: ReponseComponent,canActivate : [AuthGuard],
        data:{
          role: ['ADMIN']
        }
      },
      { path: '', redirectTo: 'evaluation', pathMatch: 'full' },
      {
        path : 'Profile' ,
        component : ProfileComponent,canActivate : [AuthGuard]
      }
    ]
  },
  { path: "**", redirectTo: "Dashboard/evaluation", pathMatch: "full" }

];
