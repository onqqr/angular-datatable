import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})

export class LoginComponent {
  public fb = inject(FormBuilder)
  public http = inject(HttpClient)
  public router = inject(Router)
  public authService = inject(AuthService)

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    // console.log(rawForm)
    this.authService
    .login(rawForm.email, rawForm.password)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('main');
      },
      error: (err) => {
        // console.error('logining:', err);
        this.errorMessage = 'Incorrect data'
      },
    });
  }
}
