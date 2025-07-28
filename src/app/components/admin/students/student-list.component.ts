import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';
import { StudentFormComponent } from './student-form.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'class', 'student_number', 'parent', 'actions'];
  dataSource = new MatTableDataSource<Student>();
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des étudiants:', error);
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openStudentForm(student?: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '800px',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  deleteStudent(student: Student): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'étudiant ${student.user.name} ?`)) {
      this.studentService.deleteStudent(student.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Étudiant supprimé avec succès', 'Fermer', { duration: 3000 });
            this.loadStudents();
          }
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}