import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DoctorServiceService } from '../../services/doctor-service.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css'],
})
export class NewExamComponent implements OnInit {
  confirm: boolean = false;
  previwe: boolean = false;

  sIndex = 0;

  subjectName = '';

  questionForm!: FormGroup;

  questions: any = [];

  correctAnswer: any;
  id: any;

  constructor(private fb: FormBuilder, private service: DoctorServiceService) {}

  ngOnInit(): void {
    this.createQuestionForm();
  }

  start() {
    if (this.subjectName != '') {
      this.confirm = true;
      this.sIndex = 1;
    } else {
      this.sIndex = 0;
      this.confirm = false;
      alert('من فضلك اكتب اسم المادة');
    }
  }

  createQuestionForm() {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
    });
  }

  correct(event: any) {
    this.correctAnswer = event.value;
  }

  nextQuestion() {
    this.previwe = false;
    if (this.correctAnswer) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctAnswer],
      };

      this.questions.push(model);
      this.questionForm.reset();
    } else {
      alert('من فضلك اختار الاجابة الصحيحة');
    }
  }

  clear() {
    this.questionForm.reset();
  }

  cancel() {
    this.questionForm.reset();
    this.questions = [];
    this.sIndex = 0;
    this.confirm = false;
    this.subjectName = '';
  }

  save() {
    const model = {
      name: this.subjectName,
      question: this.questions,
    };
    if (this.previwe) {
      this.sIndex = 2;
    } else {
      if (this.sIndex == 2) {
        this.sIndex = 1;
        this.previwe = true;
        this.service.updateSubject(model, this.id).subscribe();
      } else {
        this.service.createSubject(model).subscribe((res: any) => {
          this.previwe = true;
          this.id = res.id;
        });
      }
    }
    console.log(this.sIndex);
  }

  deleteQuestion(index: any) {
    this.questions.splice(index, 1);

    const model = {
      name: this.subjectName,
      question: this.questions,
    };

    this.service.updateSubject(model, this.id).subscribe((res: any) => {
      alert('the question was deleted succesfully');
    });
  }
}
