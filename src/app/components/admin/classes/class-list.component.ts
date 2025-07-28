import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClasseService } from '../../../services/classe.service';
import { Classe } from '../../../models/classe.model';
import { ClassFormComponent } from './class-form.component';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'level', 'academic_year', 'student_count', 'capacity', 'actions'];
  dataSource = new MatTableDataSource<Classe>();
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private classeService: ClasseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadClasses(): void {
    this.loading = true;
    this.classeService.getClasses().subscribe({
      next: (response) => {
        if (response.success) {
          this.dataSource.data = response.data.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des classes:', error);
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openClassForm(classe?: Classe): void {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '600px',
      data: classe
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClasses();
      }
    });
  }

  deleteClass(classe: Classe): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la classe ${classe.name} ?`)) {
      this.classeService.deleteClasse(classe.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Classe supprimée avec succès', 'Fermer', { duration: 3000 });
            this.loadClasses();
          }
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}