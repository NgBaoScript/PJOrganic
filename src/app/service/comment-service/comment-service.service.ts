import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private https = 'http://localhost:3000/comment';

  constructor(
    private httpClient: HttpClient,
  ) { }

  GetAll(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.https)
  }

  AddNewComment(comments): Observable<Comment> {
    return this.httpClient.post<Comment>(this.https, comments)
  }

  FindById(idProduct): Observable<any> {
    return this.httpClient.get<any>(this.https + '/' + idProduct)
  }

  DeleteCmt(id): Observable<Comment> {
    return this.httpClient.delete<Comment>(this.https + '/' + id)
  }

}
