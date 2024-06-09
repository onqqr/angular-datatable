import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IUsersApi } from '../type/apiusers.interface';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {
  public userForm: FormGroup;
  public dialogRef: DialogRef<AdduserComponent>

  constructor(private formBuilder: FormBuilder,
                      dialogRef: DialogRef<AdduserComponent>,
                      @Inject(DIALOG_DATA)
                      public data: { user: IUsersApi}
    ) {
    this.dialogRef = dialogRef;
    this.userForm = this.formBuilder.group({
      date: [this.data.user.registered.date, Validators.required],
      name: [this.data.user.name.first, Validators.required],
      surname: [this.data.user.name.last, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel() {
    this.userForm.reset()
    this.dialogRef.close();
  }

}
