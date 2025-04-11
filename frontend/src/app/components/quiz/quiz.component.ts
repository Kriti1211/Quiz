import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questions: any[] | null = null;
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  score: number = 0;
  domain: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get domain from query params; default to "Science" for testing purposes
    this.route.queryParams.subscribe((params) => {
      this.domain = params['domain'] || 'Science';
      this.fetchQuestions();
    });
  }

  fetchQuestions(): void {
    this.http
      .get<any[]>(`http://localhost:3000/questions?domain=${this.domain}`)
      .subscribe({
        next: (data) => {
          // Map each question to shuffle its options.
          const mappedQuestions = data.map((question) => ({
            ...question,
            options: this.shuffleArray([...question.options]),
          }));

          // Now shuffle the order of the questions
          this.questions = this.shuffleArray(mappedQuestions);
          console.log('Fetched and shuffled questions:', this.questions);
        },
        error: (error) => {
          console.error('Error fetching questions:', error);
          this.questions = [];
        },
      });
  }

  // Fisher–Yates shuffle algorithm: works with both arrays of options and questions.
  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onAnswerSelected(option: string): void {
    this.selectedAnswer = option;
  }

  onSubmitAnswer(): void {
    console.log('Submit answer called');
    if (
      this.selectedAnswer ===
      this.questions![this.currentQuestionIndex].correctAnswer
    ) {
      this.score++;
    }
    this.selectedAnswer = '';
    this.currentQuestionIndex++;
  
    if (this.questions && this.currentQuestionIndex >= this.questions.length) {
      this.router.navigate(['/result'], {
        queryParams: {
          score: this.score,
          total: this.questions.length,
        },
      });
    }
  }

  onQuitQuiz(): void {
    this.router.navigate(['/']);
  }
}