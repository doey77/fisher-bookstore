import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  //private booksUrl = 'https://localhost:5001/api/books'; //use the books URL for the local dotnet API
  private booksUrl = 'http://fisher-api-doey77.azurewebsites.net/api/books'; //use the books URL for the Azure dotnet API

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap(_ => console.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }
}
