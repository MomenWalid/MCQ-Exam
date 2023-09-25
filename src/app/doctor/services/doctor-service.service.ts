import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorServiceService {
  constructor(private http: HttpClient) {}

  createSubject(model: any) {
    return this.http.post(environment.baseURL + 'subjects', model);
  }

  updateSubject(model: any, id: any) {
    return this.http.put(environment.baseURL + 'subjects/' + id, model);
  }

  getAllSubjects() {
    return this.http.get(environment.baseURL + 'subjects');
  }

  getSubject(id: any) {
    return this.http.get(environment.baseURL + 'subjects/' + id);
  }

  deleteSubject(id: number) {
    return this.http.delete(environment.baseURL + 'subjects/' + id);
  }
}
