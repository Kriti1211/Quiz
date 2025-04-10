import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  questions: any[] = [];
  domains: string[] = [
    'Science',
    'Movies',
    'Math',
    'Geography',
    'Technology',
    'Sports',
    'Music',
    'History'
  ];
  selectedDomain: string = ''; // User-selected domain
  quizStarted: boolean = false; // Flag to check if the quiz has started
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  score: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('AppComponent initialized'); // Debugging log
  }

  selectDomain(domain: string) {
    this.selectedDomain = domain;
    console.log('Selected Domain:', this.selectedDomain); // Debugging log
  
    // Fetch questions based on the selected domain
    firstValueFrom(this.http.get<any[]>(`http://localhost:3000/questions?domain=${this.selectedDomain}`))
      .then(data => {
        console.log('Questions fetched from backend:', data); // Debugging log
  
        // Shuffle the options for each question
        this.questions = data.map(question => {
          const shuffledOptions = this.shuffleArray([
            ...question.options, // Spread the options array
          ]);
          return { ...question, options: shuffledOptions };
        });
  
        this.quizStarted = true; // Start the quiz
      })
      .catch(error => {
        console.error('Error fetching questions:', error); // Debugging log
      });
  }

   // Utility function to shuffle an array
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  submitAnswer() {
    console.log('Selected Answer:', this.selectedAnswer); // Debugging log
    console.log('Correct Answer:', this.questions[this.currentQuestionIndex].correctAnswer); // Debugging log
  
    if (this.selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer) {
      this.score++;
      console.log('Correct! Score updated:', this.score); // Debugging log
    } else {
      console.log('Incorrect! Score remains:', this.score); // Debugging log
    }
  
    this.currentQuestionIndex++;
    this.selectedAnswer = '';
  }

  onAnswerSelected(option: string) {
    this.selectedAnswer = option;
    console.log('Answer selected:', this.selectedAnswer); // Debugging log
  }

  goToHomePage() {
    // Reset the quiz
    this.quizStarted = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = '';
    this.questions = [];
  }
  
  quitQuiz() {
    // Handle quitting the quiz
    const confirmQuit = confirm('Are you sure you want to quit the quiz?');
    if (confirmQuit) {
      this.goToHomePage();
    }
  }
}