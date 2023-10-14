import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  userForm: FormGroup;

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
    date_of_birth: [
      { type: 'requires', message: 'Date is required.' },
    ],
    address: [
      { type: 'required', message: 'Address is required.' },
    ],
  };

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      date_of_birth: [null, Validators.required],
      address: ['', Validators.required],
    });
  }

  submitAddForm() {
    if (this.userForm.invalid) {
      return;
    }
    // Assuming your API endpoint is '/api/patients'
    const apiUrl = 'http://localhost:3000/api/patients';

    this.http.post(apiUrl, this.userForm.value).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'User Added',
          text: 'The user has been added successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          this.dialogRef.close(true); // Close the dialog and signal success
        });
      },
      (error) => {
        console.error('Error adding user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the user.',
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
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: Date | null;
  address: string;
}
