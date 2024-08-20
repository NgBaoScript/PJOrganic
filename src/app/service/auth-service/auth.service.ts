import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/user/role';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiurl = 'http://localhost:3000/user';


  constructor(private http: HttpClient) { }

  RegisterUser(user): Observable<User> {
    return this.http.post(this.apiurl, user)
  }

  Getall(): Observable<User[]> {
    return this.http.get<User[]>(this.apiurl);
  }

  GetUserbyCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }

  getuserrole(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:3000/role');
  }

  GetIdRole(id) {
    return this.http.get(this.apiurl + '/' + id);
  }

  GetAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }

  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }

  Getaccessbyrole(role: any, menu: any) {
    return this.http.get('http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu)
  }

  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }

  getrole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  }

  changePassword(userId: string, newPassword: string): Observable<any> {
    const url = `${this.apiurl}/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { password: newPassword };

    return this.http.put(url, body, { headers });
  }
}
