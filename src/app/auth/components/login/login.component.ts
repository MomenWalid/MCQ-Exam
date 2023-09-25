import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  users: any[] = [];

  type: string = 'students';

  constructor(
    private build: FormBuilder,
    private router: Router,
    private authService: AuthserviceService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
  }

  createForm() {
    this.loginForm = this.build.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      type: [this.type],
    });
  }

  getUsers() {
    this.authService.getUsers(this.type).subscribe((res: any) => {
      this.users = res;
    });
  }

  getRole(event: any) {
    this.type = event.value;

    this.getUsers();
  }

  submit() {
    let index = this.users.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );

    if (index !== -1) {
      const model = {
        username: this.users[index].userName,
        role: this.type,
        userId: this.users[index].id,
      };

      this.authService.login(model).subscribe((res: any) => {
        this.authService.user.next(res);
        this.router.navigate(['/subjects']);
      });
    } else {
      alert('  الايميل او كلمه السر غير صحيح');
    }
  }
}
