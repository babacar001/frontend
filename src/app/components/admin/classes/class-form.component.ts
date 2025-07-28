import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClasseService } from '../../../services/classe.service';
import { Classe } from '../../../models/classe.model';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {
  classForm: FormGroup;
  loading = false;
  isEdit = false;

  levels = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
  academicYears = ['2023-2024', '2024-2025', '2025-2026'];

  constructor(
    private fb: FormBuilder,
    private classeService: ClasseService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Classe
  ) {
    this.isEdit = !!data;
    this.classForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
      academic_year: ['2024-2025', [Validators.required]],
      capacity: [30, [Validators.required, Validators.min(1), Validators.max(50)]]
    });
  }

  populateForm(): void {
    if (this.data) {
      this.classForm.patchValue({
        name: this.data.name,
        level: this.data.level,
        academic_year: this.data.academic_year,
        capacity: this.data.capacity
      });
    }
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      this.loading = true;
      const formData = this.classForm.value;

      const request = this.isEdit 
        ? this.classeService.updateClasse(this.data.id, formData)
        : this.classeService.createClasse(formData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open(
              this.isEdit ? 'Classe modifiée avec succès' : 'Classe créée avec succès',
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