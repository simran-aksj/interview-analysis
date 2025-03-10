// Purpose: Main component for the application.
// This component is the root component of the application.
import { Component } from '@angular/core';
import { InterviewComponent } from './components/interview/interview.component';

@Component({
  selector: 'app-root',
  imports: [InterviewComponent],
  template: `<app-interview></app-interview>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
}
