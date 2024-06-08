import { Component } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {
  constructor() {}
}
