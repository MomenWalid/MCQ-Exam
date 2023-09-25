import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { DoctorServiceService } from 'src/app/doctor/services/doctor-service.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  user: any;
  student: any;
  total: number = 0;
  showResult: boolean = false;
  userSubjects: any = [];
  validExam: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: DoctorServiceService,
    private authService: AuthserviceService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
    this.getUserLogin();
  }

  ngOnInit(): void {}

  getSubject() {
    this.service.getSubject(this.id).subscribe((res: any) => {
      this.subject = res;
    });
  }

  getUserLogin() {
    this.authService.userLogin().subscribe((res: any) => {
      this.user = res;
      this.getStudent();
    });
  }

  getStudent() {
    this.authService.getStudent(this.user.userId).subscribe((res: any) => {
      this.student = res;
      this.userSubjects = res?.subjects ? res?.subjects : [];

      this.checkValidExam();
    });
  }

  checkValidExam() {
    for (let x in this.userSubjects) {
      if (this.userSubjects[x].id == this.id) {
        this.total = this.userSubjects[x].degree;
        this.validExam = false;
        alert('لقد انجزت هذا الاختبار مسبقا');
      }
    }
  }

  checkValue(event: any) {
    let value = event.value,
      questionIndex = event.source.name;
    this.subject.question[questionIndex].studentAnswer = value;
  }

  deleteQuestion(index: any) {
    this.subject.question.splice(index, 1);

    const model = {
      name: this.subject.name,
      question: this.subject.question,
    };

    this.service.updateSubject(model, this.id).subscribe((res: any) => {
      alert('the question was deleted succesfully');
    });
  }

  Result() {
    this.total = 0;
    for (let x in this.subject.question) {
      if (
        this.subject.question[x].studentAnswer ==
        this.subject.question[x].correctAnswer
      ) {
        this.total++;
      }
    }
    this.showResult = true;

    this.userSubjects.push({
      name: this.subject.name,
      id: this.subject.id,
      degree: this.total,
    });

    const model = {
      userName: this.student.userName,
      email: this.student.email,
      password: this.student.password,
      subjects: this.userSubjects,
    };
    this.authService
      .updateStudent(this.user.userId, model)
      .subscribe((res: any) => {
        console.log(res);
        console.log(this.user.userId);
      });
  }
}
