import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Add this import


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Include CommonModule here

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  domains: string[] = [
    'Science',
    'Movies',
    'Math',
    'Geography',
    'Technology',
    'Sports',
    'Music',
    'History',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('HomeComponent initialized');
  }

  selectDomain(domain: string): void {
    console.log('Selected Domain:', domain);
    this.router.navigate(['/quiz'], { queryParams: { domain } });
  }
}