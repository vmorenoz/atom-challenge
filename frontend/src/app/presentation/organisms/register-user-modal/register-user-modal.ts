import {Component, inject} from '@angular/core';
import {Button} from "@presentation/atoms/button/button";
import {ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-register-user-modal',
    imports: [
        Button,
        ReactiveFormsModule
    ],
  templateUrl: './register-user-modal.html',
  styleUrl: './register-user-modal.scss'
})
export class RegisterUserModal {

  dialogRef = inject(DialogRef);
  dialogData = inject(DIALOG_DATA);

  handleSubmit() {
    this.dialogRef.close(true);
  }

  handleCancel() {
    this.dialogRef.close(false);
  }

}
