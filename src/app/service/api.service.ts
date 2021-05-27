import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly base = 'https://bug-report-system-server.herokuapp.com/';
  private bugs;

  constructor(private http: HttpClient) { }

    getBugs(): Observable<any> {
      return this.http.get(this.base + 'bugs')
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
    }

    getBugsSorted(sort: string): Observable<any> {
      let opts = {
          params: new HttpParams().set('sort', sort)
      };

      return this.http.get(this.base + 'bugs', opts)
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
    }

    getBugsPagination(page): Observable<any> {
      const opts = {
        params: new HttpParams().set('page', page)
      };

      return this.http.get(this.base + 'bugs', opts)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

    getBug(id: string): Observable<any> {
      return this.http.get(this.base + 'bugs/' + id)
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
    }

    newBug(value: object) {
      this.http.post(this.base + 'bugs', value)
        .pipe(
          tap(),
          catchError(this.handleError)
        )
        .subscribe(data => {
          window.location.href = '/';
        });

    }

    deleteBug(id) {
      this.http.delete(this.base + 'bugs/' + id)
        .pipe(
          tap(),
          catchError(this.handleError)
        )
        .subscribe(data => {
          window.location.href = '/';
        });
    }

    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        console.error('An error occurred:', error.error);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }

}
