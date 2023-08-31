import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  data: User;
  
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: User
  ) {
    this.data = {...userData}; // Create a copy of the data to work with
  }

  ngOnInit(): void {
  }

  submitEditForm() {
    // Assuming your API endpoint is '/api/patients/:id'
    const apiUrl = `http://localhost:3000/api/patients/${this.data.id}`;

    this.http.put(apiUrl, this.data).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'User Updated',
          text: 'The user has been updated successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.dialogRef.close(true); // Close the dialog and signal success
        });
      },
      (error) => {
        console.error('Error updating user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the user.',
          confirmButtonText: 'OK',
        });
        // Handle error and show appropriate message
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}
