import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherService } from '../../../services/teacher.service';
import { SubjectService } from '../../../services/subject.service';
import { ClasseService } from '../../../services/classe.service';
import { Teacher } from '../../../models/teacher.model';
import { Subject } from '../../../models/subject.model';
import { Classe } from '../../../models/classe.model';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {
  teacherForm: FormGroup;
  subjects: Subject[] = [];
  classes: Classe[] = [];
  loading = false;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classeService: ClasseService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TeacherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher
  ) {
    this.isEdit = !!data;
    this.teacherForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadSubjects();
    this.loadClasses();
    if (this.isEdit) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      specialization: ['', [Validators.required]],
      hire_date: ['', [Validators.required]],
      subject_ids: [[], [Validators.required]],
      class_ids: [[]]
    });
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (response) => {
        if (response.success) {
          this.subjects = response.data.data;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des matières:', error);
      }
    });
  }

  loadClasses(): void {
    this.classeService.getClasses().subscribe({
      next: (response) => {
        if (response.success) {
          this.classes = response.data.data;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des classes:', error);
      }
    });
  }

  populateForm(): void {
    if (this.data) {
      this.teacherForm.patchValue({
        name: this.data.user.name,
        email: this.data.user.email,
        phone: this.data.user.phone,
        address: this.data.user.address,
        specialization: this.data.specialization,
        hire_date: this.data.hire_date,
        subject_ids: this.data.subjects.map(s => s.id),
        class_ids: this.data.classes.map(c => c.id)
      });
    }
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      this.loading = true;
      const formData = this.teacherForm.value;

      const request = this.isEdit 
        ? this.teacherService.updateTeacher(this.data.id, formData)
        : this.teacherService.createTeacher(formData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open(
              this.isEdit ? 'Enseignant modifié avec succès' : 'Enseignant créé avec succès',
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
}