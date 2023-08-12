import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/service/authentication.service';

export function passwordMatchValidator(): ValidatorFn { 
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmpassword = control.get('confirmPassword')?.value;

    if(password && confirmpassword && password !== confirmpassword){
      return {
        passwordsDontMatch: true
      };
    }
    return null;
  };
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, {validators: passwordMatchValidator() }
  );

  constructor(private authService: AuthenticationService, private toast: HotToastService, private router: Router ){}

  get name(){
    return this.signupForm.get('name');
  }

  get email(){
    return this.signupForm.get('email');
  }
  
  get password(){
    return this.signupForm.get('password');
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }
  submit(){
    if (!this.signupForm.valid){
      return;
    }

    const { name, email, password } = this.signupForm.value;
    this.authService.signup(name as string, email as string, password as string).pipe(
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing in',
        error: ({ message }) => '$(message)'
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}
