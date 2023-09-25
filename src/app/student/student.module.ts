import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './components/exam/exam.component';
import { GlobalModule } from '../global/global.module';

@NgModule({
  declarations: [ExamComponent],
  imports: [CommonModule, GlobalModule],
})
export class StudentModule {}
