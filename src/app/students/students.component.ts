import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) { }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  delete(student: Student): void {
    let deleteStudent: boolean = window.confirm("Czy chcesz usunąć użytkownika?");
    if (deleteStudent) {
      this.students = this.students.filter(s => s !== student);
      this.studentService.deleteStudent(student).subscribe();
    }
    
  }

  ngOnInit(): void {
    this.getStudents();
  }

}
