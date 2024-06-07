import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component ({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})

export class RegisterComponent {
  public fb = inject(FormBuilder)
  public http = inject(HttpClient)
  public authService = inject(AuthService)
  public router = inject(Router)

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    // console.log(rawForm)
    this.authService
    .register(rawForm.email, rawForm.username, rawForm.password)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        // console.error('registering:', err);
        this.errorMessage = 'Please, fill the form'
      },
    });
  }
}
