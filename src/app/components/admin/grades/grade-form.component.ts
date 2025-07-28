import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss']
})
export class GradeFormComponent implements OnInit {
  gradeForm: FormGroup;
  loading = false;
  isEdit = false;
  currentUser: any;
  isTeacher = false;

  students: Student[] = [];
  subjects: Subject[] = [];
  classes: Classe[] = [];
  periods = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];
  gradeTypes = ['Devoir', 'Composition', 'Interrogation', 'Contrôle', 'Examen'];

  constructor(
    private fb: FormBuilder,
    private gradeService: GradeService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private classeService: ClasseService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GradeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Grade
  ) {
    this.isEdit = !!data;
    this.gradeForm = this.createForm();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    this.isTeacher = this.authService.hasRole('teacher');
    this.loadData();
    if (this.isEdit) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      student_id: ['', [Validators.required]],
      subject_id: ['', [Validators.required]],
      class_id: ['', [Validators.required]],
      period: ['Trimestre 1', [Validators.required]],
      grade_type: ['Devoir', [Validators.required]],
      value: ['', [Validators.required, Validators.min(0)]],
      max_value: [20, [Validators.required, Validators.min(1)]],
      date: [new Date().toISOString().split('T')[0], [Validators.required]],
      comment: ['']
    });
  }

  loadData(): void {
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

  populateForm(): void {
    if (this.data) {
      this.gradeForm.patchValue({
        student_id: this.data.student_id,
        subject_id: this.data.subject_id,
        class_id: this.data.class_id,
        period: this.data.period,
        grade_type: this.data.grade_type,
        value: this.data.value,
        max_value: this.data.max_value,
        date: this.data.date,
        comment: this.data.comment
      });
    }
  }

  onSubmit(): void {
    if (this.gradeForm.valid) {
      this.loading = true;
      const formData = this.gradeForm.value;

      const request = this.isEdit 
        ? this.gradeService.updateGrade(this.data.id, formData)
        : this.gradeService.createGrade(formData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open(
              this.isEdit ? 'Note modifiée avec succès' : 'Note ajoutée avec succès',
              'Fermer',
              { duration: 3000 }
            );
            this.dialogRef.close(true);
          }
          this.loading = false;
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la sauvegarde', 'Fermer', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get percentage(): number {
    const value = this.gradeForm.get('value')?.value || 0;
    const maxValue = this.gradeForm.get('max_value')?.value || 20;
    return maxValue > 0 ? (value / maxValue) * 100 : 0;
  }
}