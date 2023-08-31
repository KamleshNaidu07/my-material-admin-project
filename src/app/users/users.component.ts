import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component'; // Import your dialog component


export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchUsers(); // Call the method to fetch users on component initialization
    this.fetchTotalUsersCount();
  }

  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  searchTerm: string = '';
  // for pagination
  pageIndex = 0;
  pageSize = 5; // Set the initial page size
  pageSizeOptions: number[] = [5, 10, 25, 30]; // Options for the page size dropdown
  totalUsers = 0;


  fetchUsers() {
    const apiUrl = 'http://localhost:3000/api/patients';
    const queryParams = `?page=${this.pageIndex + 1}&limit=${this.pageSize}&searchTerm=${this.searchTerm}`;

    this.http.get<{ data: User[], totalCount: number }>(apiUrl + queryParams).subscribe(
      (response) => {
        if (response.data.length > 0) {
          this.users = response.data;
          // this.totalUsers = response.totalCount;
          this.applyFilter();
        } else {
          this.users = []; // Clear the users array if no data
          this.totalUsers = 0; // Reset the total user count
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchTotalUsersCount() {
    const apiUrl = 'http://localhost:3000/api/patients'; // Change the API endpoint as needed
    const queryParams = `?searchTerm=${this.searchTerm}`;

    this.http.get<{ data: User[] }>(apiUrl + queryParams).subscribe(
      (response) => {
        this.totalUsers = response.data.length;
      },
      (error) => {
        console.error('Error fetching total users count:', error);
      }
    );
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phone_number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.first_name.toLowerCase() + user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) // For full name filter case
    );
  }
  async onFilterChange() {
    this.pageIndex = 0; // Reset to the first page when filtering
    this.fetchUsers(); // Call the fetchUsers function with the updated search term
    this.fetchTotalUsersCount(); // Fetch the total users count
  }

  clearFilter() {
    this.searchTerm = ''; // Clear the filter
    this.onFilterChange(); // Call the filter change function
  }

  sortData(event: any) {
    // Implement sorting logic based on event
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchUsers();
    this.fetchTotalUsersCount();
  }
  
  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px', // You can adjust the width as needed
      data: user // Pass the selected user to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // This function will be called when the dialog is closed

      if (result === true) {
        this.fetchUsers();
        this.fetchTotalUsersCount();
      }
    });
  }
}
