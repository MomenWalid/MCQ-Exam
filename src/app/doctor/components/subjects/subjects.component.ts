import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  subjects: any = [];
  role: any;

  constructor(
    private service: DoctorServiceService,
    private authService: AuthserviceService
  ) {}

  ngOnInit(): void {
    this.getSubjects();
    this.getUserLogin();
  }

  getSubjects() {
    this.service.getAllSubjects().subscribe((res: any) => {
      this.subjects = res;
    });
  }

  getUserLogin() {
    this.authService.userLogin().subscribe((res: any) => {
      this.role = res.role;
    });
  }

  delete(index: number) {
    let id = this.subjects[index].id;
    this.subjects.splice(index, 1);

    this.service.deleteSubject(id).subscribe((res: any) => {
      alert('تم حذف المادة بنجاح');
    });
  }
}
