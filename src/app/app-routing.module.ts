import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';
import { StudentListComponent } from './components/admin/students/student-list.component';
import { TeacherListComponent } from './components/admin/teachers/teacher-list.component';
import { ClassListComponent } from './components/admin/classes/class-list.component';
import { SubjectListComponent } from './components/admin/subjects/subject-list.component';
import { GradeListComponent } from './components/admin/grades/grade-list.component';
import { ReportListComponent } from './components/admin/reports/report-list.component';
import { BulletinListComponent } from './components/portal/bulletins/bulletin-list.component';
import { TeacherDashboardComponent } from './components/teacher/dashboard/teacher-dashboard.component';
import { TeacherClassesComponent } from './components/teacher/classes/teacher-classes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'teacher'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'teachers', component: TeacherListComponent },
      { path: 'classes', component: ClassListComponent },
      { path: 'subjects', component: SubjectListComponent },
      { path: 'grades', component: GradeListComponent },
      { path: 'reports', component: ReportListComponent },
    ]
  },


  {
    path: 'teacher',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['teacher'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: 'classes', component: TeacherClassesComponent },
    ]
  },

  {
    path: 'portal',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['student', 'parent'] },
    children: [
      { path: '', redirectTo: 'bulletins', pathMatch: 'full' },
      { path: 'bulletins', component: BulletinListComponent },
    ]
  },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }