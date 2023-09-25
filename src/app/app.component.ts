import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from './auth/services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MCQ-Exam';

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
    this.getLlogin();
  }

  getLlogin() {
    this.authService.userLogin().subscribe((res) => {
      this.authService.user.next(res);
    });
  }
}
