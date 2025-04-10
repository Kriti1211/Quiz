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
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  score: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('AppComponent initialized'); // Debugging log
  
    firstValueFrom(this.http.get<any[]>('http://localhost:3000/questions'))
      .then(data => {
        console.log('Questions fetched from backend:', data); // Debugging log
        this.questions = data;
      })
      .catch(error => {
        console.error('Error fetching questions:', error); // Debugging log
      });
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
}