import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page
  { path: 'quiz', component: QuizComponent }, // Quiz page
  { path: 'result', component: ResultComponent }, // Result page
  { path: '**', redirectTo: '' }, // Redirect unknown routes to home
];
