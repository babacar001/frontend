import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher.model';
import { TeacherFormComponent } from './teacher-form.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'specialization', 'teacher_number', 'subjects', 'actions'];
  dataSource = new MatTableDataSource<Teacher>();
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTeachers(): void {
    this.loading = true;
    this.teacherService.getTeachers().subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des enseignants:', error);
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openTeacherForm(teacher?: Teacher): void {
    const dialogRef = this.dialog.open(TeacherFormComponent, {
      width: '700px',
      data: teacher
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTeachers();
      }
    });
  }

  deleteTeacher(teacher: Teacher): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'enseignant ${teacher.user.name} ?`)) {
      this.teacherService.deleteTeacher(teacher.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Enseignant supprimé avec succès', 'Fermer', { duration: 3000 });
            this.loadTeachers();
          }
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  getSubjectNames(teacher: Teacher): string {
    return teacher.subjects.map(s => s.name).join(', ');
  }
}