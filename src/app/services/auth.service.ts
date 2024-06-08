import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { IUser } from "../type/user.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public firebaseAuth = inject(Auth)
  public user$ = user(this.firebaseAuth)
  public markerUser = signal<IUser | null | undefined>(undefined)
  public route = inject(Router)

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(response => updateProfile(response.user, { displayName: username })
  )

  return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {})

    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      this.route.navigateByUrl('login')
    })
    return from(promise)
  }
}
