import { Component, OnInit } from '@angular/core';
import { ReportCardService } from '../../../services/report-card.service';
import { AuthService } from '../../../services/auth.service';
import { ReportCard } from '../../../models/report-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulletin-list',
  templateUrl: './bulletin-list.component.html',
  styleUrls: ['./bulletin-list.component.scss']
})
export class BulletinListComponent implements OnInit {
  bulletins: ReportCard[] = [];
  loading = false;
  currentUser: any;

  constructor(
    private reportCardService: ReportCardService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    this.loadBulletins();
  }

  loadBulletins(): void {
    this.loading = true;
    this.reportCardService.getReportCards().subscribe({
      next: (response) => {
        if (response.success) {
          this.bulletins = response.data.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des bulletins:', error);
        this.loading = false;
      }
    });
  }

  downloadBulletin(bulletin: ReportCard): void {
    this.reportCardService.downloadReportCard(bulletin.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bulletin_${bulletin.student.user.name}_${bulletin.period}.pdf`;
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