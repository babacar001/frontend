import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-generate-report-dialog',
  templateUrl: './generate-report-dialog.component.html',
  styleUrls: ['./generate-report-dialog.component.scss']
})
export class GenerateReportDialogComponent implements OnInit {
  generateForm: FormGroup;
  students: Student[] = [];
  periods = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];
  academicYears = ['2023-2024', '2024-2025', '2025-2026'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<GenerateReportDialogComponent>
  ) {
    this.generateForm = this.fb.group({
      student_id: ['', [Validators.required]],
      period: ['Trimestre 1', [Validators.required]],
      academic_year: ['2024-2025', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (response) => {
        if (response.success) {
          this.students = response.data.data;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.generateForm.valid) {
      this.dialogRef.close(this.generateForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}