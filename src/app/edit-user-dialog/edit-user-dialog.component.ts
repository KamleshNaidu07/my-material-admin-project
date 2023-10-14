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
  userForm!: FormGroup; // Declare a FormGroup for your form
  // data: User;
  // Define error messages
  errorMessages = {
    first_name: [
      { type: 'required', message: 'First Name is required.' },
    ],
    last_name: [
      { type: 'required', message: 'Last Name is required.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Invalid email format.' },
    ],
    phone_number: [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Invalid phone number format.' },
    ],
  };

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private formBuilder: FormBuilder
  ) {

    // Create a FormGroup with form controls and initial values
    this.userForm = this.formBuilder.group({
      first_name: [userData.first_name, Validators.required],
      last_name: [userData.last_name, Validators.required],
      email: [userData.email, [Validators.required, Validators.email]],
      phone_number: [userData.phone_number, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
    // this.data = {...userData}; // Create a copy of the data to work with

  }

  ngOnInit(): void {
  }

  submitEditForm() {
    // Assuming your API endpoint is '/api/patients/:id'
    const apiUrl = `http://localhost:3000/api/patients/${this.userData.id}`;

    const updatedUserData = this.userForm.value; // Get the form data

    this.http.put(apiUrl, updatedUserData).subscribe(
      (response) => {
        // console.log('User updated successfully:', response);
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
