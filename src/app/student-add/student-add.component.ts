import { Component, OnInit, Input} from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  @Input() students: Student[];

  constructor(private studentService: StudentService) { }

  add(name: string, email: string, username: string): void {
    name = name.trim();
    email = email.trim();
    username = username.trim();
  
    if (!name || !email || !username) {
      alert("Wpisz wszystkie dane nowego studenta");
      return;
    }

    if (email.indexOf('@') < 1) {
      return;
    }
  
      this.studentService.addStudent({ name, email, username } as Student)
        .subscribe(student=> {
          this.students.push(student);
        });
  }

  ngOnInit(): void {
  }

}
