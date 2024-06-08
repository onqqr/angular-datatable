import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { IUsersApi } from "../type/apiusers.interface";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { DataTablesModule } from "angular-datatables";
import { Config } from "datatables.net";

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

  constructor(private http: HttpClient) {
    this.fetchUsers();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full'
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  fetchUsers() {
    this.http.get<{ results: IUsersApi[] }>('https://randomuser.me/api/?results=30')
      .subscribe(response => {
        console.log('Response:', response);
        this.users = response.results;
        this.dtTrigger.next(null);
      });
  }
}
