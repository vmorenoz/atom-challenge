import {Component, inject, OnInit, signal} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '@presentation/atoms/button/button';

interface TaskForm {
  title: FormControl<string|null>;
  description: FormControl<string|null>;
}

@Component({
  selector: 'app-task-form-modal',
  imports: [
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './task-form-modal.html',
  styleUrl: './task-form-modal.scss'
})
export class TaskFormModal implements OnInit {

  dialogRef = inject(DialogRef);
  dialogData = inject(DIALOG_DATA);
  formBuilder = inject(FormBuilder);

  isEdition = signal(false);
  taskForm!: FormGroup<TaskForm>;

  ngOnInit() {
    this.isEdition.set(this.dialogData?.isEdition);
    this.initializeForm();
  }

  handleSubmit() {
    if (this.taskForm.invalid) return;

    this.dialogRef.close(this.taskForm.value);
  }

  handleCancel() {
    this.dialogRef.close();
  }

  private initializeForm() {
    this.taskForm = this.formBuilder.group({
      title: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      description: this.formBuilder.control('', [
        Validators.required
      ]),
    });

    if(this.isEdition()){
      this.taskForm.patchValue(this.dialogData.task);
    }
  }
}
