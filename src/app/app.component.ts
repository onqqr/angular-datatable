import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, DataTablesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.markerUser.set({
          email: user.email!,
          username: user.displayName!,
        })
      } else {
        this.authService.markerUser.set(null)
      }
      console.log(this.authService.markerUser())
    })
  }

  logout(): void {
    this.authService.logout()
  }
}
