import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Components
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';
import { StudentListComponent } from './components/admin/students/student-list.component';
import { StudentFormComponent } from './components/admin/students/student-form.component';
import { TeacherListComponent } from './components/admin/teachers/teacher-list.component';
import { TeacherFormComponent } from './components/admin/teachers/teacher-form.component';
import { ClassListComponent } from './components/admin/classes/class-list.component';
import { ClassFormComponent } from './components/admin/classes/class-form.component';
import { SubjectListComponent } from './components/admin/subjects/subject-list.component';
import { SubjectFormComponent } from './components/admin/subjects/subject-form.component';
import { GradeListComponent } from './components/admin/grades/grade-list.component';
import { GradeFormComponent } from './components/admin/grades/grade-form.component';
import { ReportListComponent } from './components/admin/reports/report-list.component';
import { GenerateReportDialogComponent } from './components/admin/reports/generate-report-dialog.component';
import { BulletinListComponent } from './components/portal/bulletins/bulletin-list.component';
import { TeacherDashboardComponent } from './components/teacher/dashboard/teacher-dashboard.component';
import { TeacherClassesComponent } from './components/teacher/classes/teacher-classes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    StudentListComponent,
    StudentFormComponent,
    TeacherListComponent,
    TeacherFormComponent,
    ClassListComponent,
    ClassFormComponent,
    SubjectListComponent,
    SubjectFormComponent,
    GradeListComponent,
    GradeFormComponent,
    ReportListComponent,
    GenerateReportDialogComponent,
    BulletinListComponent,
    TeacherDashboardComponent,
    TeacherClassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }