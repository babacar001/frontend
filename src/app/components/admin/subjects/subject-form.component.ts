import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/subject.model';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {
  subjectForm: FormGroup;
  loading = false;
  isEdit = false;

  levels = ['Collège', 'Lycée', 'Primaire'];

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SubjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subject
  ) {
    this.isEdit = !!data;
    this.subjectForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      coefficient: [1, [Validators.required, Validators.min(0.5), Validators.max(10)]],
      level: ['Collège', [Validators.required]],
      description: ['']
    });
  }

  populateForm(): void {
    if (this.data) {
      this.subjectForm.patchValue({
        name: this.data.name,
        code: this.data.code,
        coefficient: this.data.coefficient,
        level: this.data.level,
        description: this.data.description
      });
    }
  }

  onSubmit(): void {
    if (this.subjectForm.valid) {
      this.loading = true;
      const formData = this.subjectForm.value;

      const request = this.isEdit 
        ? this.subjectService.updateSubject(this.data.id, formData)
        : this.subjectService.createSubject(formData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open(
              this.isEdit ? 'Matière modifiée avec succès' : 'Matière créée avec succès',
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