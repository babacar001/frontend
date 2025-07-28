import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../../services/student.service';
import { ClasseService } from '../../../services/classe.service';
import { Student } from '../../../models/student.model';
import { Classe } from '../../../models/classe.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  classes: Classe[] = [];
  loading = false;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private classeService: ClasseService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.isEdit = !!data;
    this.studentForm = this.createForm();
  }

  ngOnInit(): void {
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
      class_id: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      birth_place: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      documents: [['Acte de naissance'], [Validators.required]],
      parent_name: ['', [Validators.required]],
      parent_email: ['', [Validators.required, Validators.email]],
      parent_phone: [''],
      parent_profession: [''],
      parent_workplace: ['']
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
      this.studentForm.patchValue({
        name: this.data.user.name,
        email: this.data.user.email,
        phone: this.data.user.phone,
        address: this.data.user.address,
        class_id: this.data.class_id,
        birth_date: this.data.birth_date,
        birth_place: this.data.birth_place,
        gender: this.data.gender,
        documents: this.data.documents,
        parent_name: this.data.parent.user.name,
        parent_email: this.data.parent.user.email,
        parent_phone: this.data.parent.user.phone,
        parent_profession: this.data.parent.profession,
        parent_workplace: this.data.parent.workplace
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.loading = true;
      const formData = this.studentForm.value;

      const request = this.isEdit 
        ? this.studentService.updateStudent(this.data.id, formData)
        : this.studentService.createStudent(formData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open(
              this.isEdit ? 'Étudiant modifié avec succès' : 'Étudiant créé avec succès',
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