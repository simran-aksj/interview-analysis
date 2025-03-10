import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-interview',
  imports: [CommonModule, FormsModule],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.scss',
})
export class InterviewComponent {
  question: string = '';
  response: string = '';
  result: any = null;

  constructor(private http: HttpClient) {}

  analyzeResponse() {
    if (!this.question || !this.response) {
      alert('Please enter both question and response.');
      return;
    }

    this.http
      .post('http://localhost:3000/analyze', {
        question: this.question,
        response: this.response,
      })
      .subscribe((res: any) => {
        this.result = res;
      });
  }
  title = 'interview-form';
}
