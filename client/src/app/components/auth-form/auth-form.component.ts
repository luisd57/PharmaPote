import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/User.interface';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input() isLoginMode: boolean = true;
  @Input() errorMessage: string = '';
  @Output() onFormSubmit = new EventEmitter<IUser>();

  authForm: FormGroup;
  isSubmitting: boolean = false;
  isError: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.onFormSubmit.emit(this.authForm.value);
  }

  setErrorMessage(message: string): void {
    this.errorMessage = message;
    this.isError = true;
    console.log('AuthFormComponent Error:', this.errorMessage);
  }

}
