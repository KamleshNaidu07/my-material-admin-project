import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { LoginComponent } from './login/login.component'; // Import MaterialModule


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DashboardComponent,
    EditUserDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Added FormsModule here
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, // Added MaterialModule to imports,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
