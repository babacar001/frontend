import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GradeService } from '../../../services/grade.service';
import { StudentService } from '../../../services/student.service';
import { SubjectService } from '../../../services/subject.service';
import { ClasseService } from '../../../services/classe.service';
import { AuthService } from '../../../services/auth.service';
import { Grade } from '../../../models/grade.model';
import { Student } from '../../../models/student.model';
import { Subject } from '../../../models/subject.model';
import { Classe } from '../../../models/classe.model';
import { GradeFormComponent } from './grade-form.component';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  displayedColumns: string[] = ['student', 'subject', 'class', 'period', 'grade_type', 'value', 'date', 'actions'];
  dataSource = new MatTableDataSource<Grade>();
  loading = false;

  students: Student[] = [];
  subjects: Subject[] = [];
  classes: Classe[] = [];
  periods = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];

  selectedStudent: number | null = null;
  selectedSubject: number | null = null;
  selectedClass: number | null = null;
  selectedPeriod: string | null = null;

  currentUser: any;
  isTeacher = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private gradeService: GradeService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private classeService: ClasseService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    this.isTeacher = this.authService.hasRole('teacher');
    this.loadFilters();
    this.loadGrades();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFilters(): void {
    // Charger les étudiants
    this.studentService.getStudents().subscribe({
      next: (response) => {
        if (response.success) {
          this.students = response.data.data;
        }
      }
    });

    // Charger les matières
    this.subjectService.getSubjects().subscribe({
      next: (response) => {
        if (response.success) {
          this.subjects = response.data.data;
        }
      }
    });

    // Charger les classes
    this.classeService.getClasses().subscribe({
      next: (response) => {
        if (response.success) {
          this.classes = response.data.data;
        }
      }
    });
  }

  loadGrades(): void {
    this.loading = true;
    const params: any = {};
    
    if (this.selectedStudent) params.student_id = this.selectedStudent;
    if (this.selectedSubject) params.subject_id = this.selectedSubject;
    if (this.selectedClass) params.class_id = this.selectedClass;
    if (this.selectedPeriod) params.period = this.selectedPeriod;

    this.gradeService.getGrades(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notes:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.loadGrades();
  }

  clearFilters(): void {
    this.selectedStudent = null;
    this.selectedSubject = null;
    this.selectedClass = null;
    this.selectedPeriod = null;
    this.loadGrades();
  }

  openGradeForm(grade?: Grade): void {
    const dialogRef = this.dialog.open(GradeFormComponent, {
      width: '700px',
      data: grade
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGrades();
      }
    });
  }

  deleteGrade(grade: Grade): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cette note ?`)) {
      this.gradeService.deleteGrade(grade.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Note supprimée avec succès', 'Fermer', { duration: 3000 });
            this.loadGrades();
          }
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  getGradeColor(percentage: number): string {
    if (percentage >= 80) return 'primary';
    if (percentage >= 60) return 'accent';
    if (percentage >= 40) return 'warn';
    return 'warn';
  }

  canEditGrade(grade: Grade): boolean {
    // Les enseignants ne peuvent modifier que leurs propres notes
    if (this.isTeacher) {
      return grade.teacher?.user?.email === this.currentUser?.email;
    }
    // Les admins peuvent tout modifier
    return true;
  }
}