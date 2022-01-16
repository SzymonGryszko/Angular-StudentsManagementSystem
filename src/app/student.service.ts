import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Student } from './student';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentsUrl = 'https://jsonplaceholder.typicode.com/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.put<Student>(url, student, this.httpOptions);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions);
  }

  deleteStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.delete<Student>(url, this.httpOptions);
  }

  private searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Student[]>(`${this.studentsUrl}?name_like=${term}`);
  }

  search(searchTerms$: Subject<string>) {
    return searchTerms$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchStudents(term))
    );
  }
}
