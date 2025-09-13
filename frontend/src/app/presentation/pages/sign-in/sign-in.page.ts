import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@data/services/auth.service';
import {UserService} from '@data/services/user.service';
import {Button} from '@presentation/atoms/button/button';
import {Router} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';
import {Dialog} from '@angular/cdk/dialog';
import {RegisterUserModal} from '@presentation/organisms/register-user-modal/register-user-modal';

interface SignInForm {
  email: FormControl<string|null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './sign-in.page.html',
  styleUrl: './sign-in.page.scss'
})
export class SignInPage implements OnInit {

  readonly formBuilder = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  readonly dialog = inject(Dialog);

  signInForm!: FormGroup<SignInForm>;
  erroMessage = signal('');
  isLoading = signal(false);

  ngOnInit() {
    this.initializeForm();
  }

  handleSignIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);

    const email = this.signInForm.get('email')?.value;

    this.userService.findUserByEmail(email!)
      .subscribe({
        next: async (user) => {
          const authResp = await this.authService.signInWithToken(user?.token!);
          if (!authResp) {
            this.erroMessage.set('No se pudo iniciar sesión, intente nuevamente');
            this.isLoading.set(false);
            return;
          }
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          if(error.status === HttpStatusCode.NotFound){
            this.erroMessage.set('No existe un usuario registrado con ese correo');
            this.askForRegistration(email!);
          }
          this.erroMessage.set('No se pudo iniciar sesión, intente nuevamente');
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }

  private askForRegistration(email: string) {
    const dialog = this.dialog.open(RegisterUserModal, {
      width: '50vw',
      data: {
        email
      }
    });

    dialog.closed.subscribe((result) => {
      if (result) {
        this.registerNewUser(email);
      }
    });
  }

  private registerNewUser(email: string) {
    this.isLoading.set(true);
    this.userService.addUser(email!)
      .subscribe({
        next: async (user) => {
          const authResp = await this.authService.signInWithToken(user?.token!);
          if (!authResp) {
            this.erroMessage.set('No se pudo iniciar sesión, intente nuevamente');
            this.isLoading.set(false);
            return;
          }
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.erroMessage.set('No se pudo iniciar sesión, intente nuevamente');
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      })
  }

  private initializeForm() {
    this.signInForm = this.formBuilder.group<SignInForm>({
      email: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.email
      ])
    });

    this.signInForm.controls.email
      .valueChanges.subscribe(value => {
        const error = this.signInForm.controls.email.errors;
        if (error?.['required']) {
          this.erroMessage.set('El correo es obligatorio');
        } else if (error?.['email']) {
          this.erroMessage.set('El correo no es válido');
        } else {
          this.erroMessage.set('');
        }
    })
  }
}
