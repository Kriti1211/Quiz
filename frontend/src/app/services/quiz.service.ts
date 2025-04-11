import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id: number;
  domain: string;
  question: string;
  correctAnswer: string;
  options: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) {}

  // Optionally pass a domain parameter to filter questions by domain.
  getQuestions(domain?: string): Observable<Question[]> {
    let url = '/api/questions';
    if (domain) {
      url += `?domain=${encodeURIComponent(domain)}`;
    }
    return this.http.get<Question[]>(url);
  }
}