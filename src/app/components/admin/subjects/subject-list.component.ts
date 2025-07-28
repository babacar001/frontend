import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/subject.model';
import { SubjectFormComponent } from './subject-form.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'code', 'coefficient', 'level', 'actions'];
  dataSource = new MatTableDataSource<Subject>();
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private subjectService: SubjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSubjects(): void {
    this.loading = true;
    this.subjectService.getSubjects().subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des matières:', error);
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSubjectForm(subject?: Subject): void {
    const dialogRef = this.dialog.open(SubjectFormComponent, {
      width: '600px',
      data: subject
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubjects();
      }
    });
  }

  deleteSubject(subject: Subject): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la matière ${subject.name} ?`)) {
      this.subjectService.deleteSubject(subject.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Matière supprimée avec succès', 'Fermer', { duration: 3000 });
            this.loadSubjects();
          }
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}