import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportCardService } from '../../../services/report-card.service';
import { StudentService } from '../../../services/student.service';
import { ReportCard } from '../../../models/report-card.model';
import { Student } from '../../../models/student.model';
import { GenerateReportDialogComponent } from './generate-report-dialog.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  displayedColumns: string[] = ['student', 'class', 'period', 'academic_year', 'general_average', 'rank', 'mention', 'generated_at', 'actions'];
  dataSource = new MatTableDataSource<ReportCard>();
  loading = false;

  students: Student[] = [];
  periods = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];
  academicYears = ['2023-2024', '2024-2025', '2025-2026'];

  selectedStudent: number | null = null;
  selectedPeriod: string | null = null;
  selectedYear: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private reportCardService: ReportCardService,
    private studentService: StudentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadReports();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  loadReports(): void {
    this.loading = true;
    const params: any = {};
    
    if (this.selectedStudent) params.student_id = this.selectedStudent;
    if (this.selectedPeriod) params.period = this.selectedPeriod;
    if (this.selectedYear) params.academic_year = this.selectedYear;

    this.reportCardService.getReportCards(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des bulletins:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.loadReports();
  }

  clearFilters(): void {
    this.selectedStudent = null;
    this.selectedPeriod = null;
    this.selectedYear = null;
    this.loadReports();
  }

  openGenerateDialog(): void {
    const dialogRef = this.dialog.open(GenerateReportDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.generateReport(result);
      }
    });
  }

  generateReport(data: any): void {
    this.reportCardService.generateReportCard(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Bulletin généré avec succès', 'Fermer', { duration: 3000 });
          this.loadReports();
        }
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de la génération', 'Fermer', { duration: 3000 });
      }
    });
  }

  downloadReport(report: ReportCard): void {
    this.reportCardService.downloadReportCard(report.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bulletin_${report.student.user.name}_${report.period}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du téléchargement', 'Fermer', { duration: 3000 });
      }
    });
  }

  getMentionColor(mention: string): string {
    switch (mention) {
      case 'E': return 'primary';
      case 'TB': return 'accent';
      case 'B': return 'primary';
      case 'AB': return 'warn';
      case 'P': return 'warn';
      case 'I': return 'warn';
      default: return 'primary';
    }
  }
}