import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  score: number = 0;
  total: number = 0;
  responses: { question: string; selected: string; correct: string }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.score = +params['score'] || 0;
      this.total = +params['total'] || 0;
      if (params['responses']) {
      this.responses = JSON.parse(params['responses']);
    }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}