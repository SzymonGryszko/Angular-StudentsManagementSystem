import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css'],
})
export class StudentSearchComponent implements OnInit {
  students$: Observable<Student[]>;
  searchTerms$ = new Subject<string>();

  constructor(private studentService: StudentService) {
    this.students$ = this.studentService.search(this.searchTerms$);
  }

  identifyStudent(student: Student) {
    return student.id;
  }

  ngOnInit(): void {}
}
