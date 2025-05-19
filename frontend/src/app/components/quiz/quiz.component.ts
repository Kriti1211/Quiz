import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: any[] | null = null;
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  score: number = 0;
  domain: string = '';
  userResponses: { question: string; selected: string; correct: string }[] = [];


  // New timer properties
  timeLimit: number = 10; // seconds allowed per question
  currentTime: number = this.timeLimit;
  timerSubscription!: Subscription;

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
          // Start timer for the first question
          this.startTimer();
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

  startTimer(): void {
    // Reset currentTime and clear any existing timer
    this.currentTime = this.timeLimit;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    // Create an interval observable that ticks every second
    this.timerSubscription = interval(1000).subscribe(() => {
      this.currentTime--;
      if (this.currentTime <= 0) {
        this.timerSubscription.unsubscribe();
        this.autoSubmit();
      }
    });
  }

  autoSubmit(): void {
  console.log('Time is up for this question');
  if (this.selectedAnswer === '') {
    // Store the unanswered response for the current question
    this.userResponses.push({
      question: this.questions![this.currentQuestionIndex].question,
      selected: '',
      correct: this.questions![this.currentQuestionIndex].correctAnswer,
    });
    this.currentQuestionIndex++;
    if (this.questions && this.currentQuestionIndex >= this.questions.length) {
      this.router.navigate(['/result'], {
        queryParams: {
          score: this.score,
          total: this.questions.length,
          responses: JSON.stringify(this.userResponses),
        },
      });
    } else {
      this.startTimer();
    }
  } else {
    this.onSubmitAnswer();
  }
}

onSubmitAnswer(): void {
  if (this.timerSubscription) {
    this.timerSubscription.unsubscribe();
  }
  // Store the user's response for the current question
  this.userResponses.push({
    question: this.questions![this.currentQuestionIndex].question,
    selected: this.selectedAnswer,
    correct: this.questions![this.currentQuestionIndex].correctAnswer,
  });
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
        responses: JSON.stringify(this.userResponses),
      },
    });
  } else {
    this.startTimer();
  }
}

  onQuitQuiz(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}