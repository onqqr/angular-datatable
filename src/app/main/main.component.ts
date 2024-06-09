import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { IUsersApi } from "../type/apiusers.interface";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";
import { AdduserComponent } from "../adduser/adduser.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, DataTablesModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  users: IUsersApi[] = [];
  dtOptions: Config={}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.fetchUsers();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      language: {
        searchPlaceholder: 'Enter name user...'
      }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteUser(user: IUsersApi) {
    if (confirm('Are your sure you want to delete user?')) {
      this.users = this.users.filter(u => u !== user);
      if ($.fn.DataTable.isDataTable('#example')) {
        $('#example').DataTable().destroy(true);
        this.dtTrigger.next(null);
      }
    }
  }

  fetchUsers() {
    this.http.get<{ results: IUsersApi[] }>('https://randomuser.me/api/?results=30')
      .subscribe(response => {
        console.log('Response:', response);
        this.users = response.results;
        this.dtTrigger.next(null);
      });
  }

  openAddUser() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      data: {
        user: {
          registered: {
            date: new Date().toISOString().slice(0, 10)
          },
          name: {
            first: '',
            last: ''
          },
          email: ''
        }
      }
    });;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.push(result);
        if ($.fn.DataTable.isDataTable('#example')) {
          $('#example').DataTable().destroy(true);
          this.dtTrigger.next(null);
        }
      }
    });
  }
}
