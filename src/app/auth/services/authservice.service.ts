import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}

  user = new Subject();

  createUser(model: any) {
    return this.http.post(environment.baseURL + 'students', model);
  }
  getUsers(type: string) {
    return this.http.get(environment.baseURL + type);
  }

  login(model: any) {
    return this.http.put(environment.baseURL + 'login/1', model);
  }

  getStudent(id: number) {
    return this.http.get(environment.baseURL + 'students/' + id);
  }

  updateStudent(id: number, model: any) {
    return this.http.put(environment.baseURL + 'students/' + id, model);
  }

  userLogin() {
    return this.http.get(environment.baseURL + 'login/1');
  }
}
