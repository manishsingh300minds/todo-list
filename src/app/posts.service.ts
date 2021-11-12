import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map }  from 'rxjs/operators';
import { PostType } from './listing/listing.component';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  postUrl = "http://localhost:4000/listing";

  constructor(private http: HttpClient) {}

  getPosts() : Observable<PostType[]>{
    return this.http.get<any[]>(this.postUrl).pipe(map((postData : any) => {
      return postData.map((post : any) => {
        return {
          title : post.title,
          description : post.description,
          id : post._id
        }
      })
    }),
      catchError(this.handleError));
    }

    addPost(data : any) : Observable<any> {
      console.log('in service',data);
        return this.http.post<Task>(this.postUrl,data,{
              headers : new HttpHeaders({
              'Content-Type' : 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    updatePost(id: string,title : string, description : string){
      const post = {
        id : id,
        title : title,
        description : description
      }
       return this.http.put(`${this.postUrl}/${id}` ,post).pipe(catchError(this.handleError));
    }

    deletePost(id : string) : Observable<any>{
      return this.http.delete<void>(`${this.postUrl}/${id}`).pipe(catchError(this.handleError));
    }

  private handleError(errorResponse : HttpErrorResponse): Observable<any>{
    if(errorResponse.error instanceof Error){
        console.log("Client Side Error:", errorResponse.error.message);
    }
    else {
        console.log("Client Side Error:", errorResponse);
    }
    return errorResponse.error;
  }
}
