import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  headColumns: any;
  datasrc: any;
  studentsData: any;
  constructor(private authService: AuthserviceService) {
    this.headColumns = ['position', 'name', 'subject', 'degree'];
  }

  ngOnInit(): void {
    this.sData();
  }

  sData() {
    this.authService.getUsers('students').subscribe((res: any) => {
      this.datasrc = res.map((student: any) => {
        if (student.subjects) {
          return student.subjects.map((sub: any) => {
            return {
              name: student.userName,
              subject: sub.name,
              degree: sub.degree,
            };
          });
        } else {
          return [
            {
              name: student.userName,
              subject: '-',
              degree: '-',
            },
          ];
        }
      });

      this.studentsData = [];

      this.datasrc.forEach((element: any) => {
        element.forEach((e: any) => {
          this.studentsData.push({
            name: e.name,
            subject: e.subject,
            degree: e.degree,
          });
        });
      });
    });
  }
}
