import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/share.module';
import { StudentsRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddStudentComponent } from './models/add-student/add-student.component';
import { EditStudentComponent } from './models/edit-student/edit-student.component';

@NgModule({
  declarations: [StudentComponent,AddStudentComponent,EditStudentComponent],
  imports: [
    SharedModule,
    StudentsRoutingModule,
  ],entryComponents:[AddStudentComponent,EditStudentComponent]
})
export class StudentsModule { }
