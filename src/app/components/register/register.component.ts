import { Component, Input, OnInit } from '@angular/core';
import  { User } from '../../models/user';
import  { RegisterUser } from '../../models/register-user';
import { FormGroup, FormArray,  Validators, FormControl } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input()
  registerForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  user: User;
  passwordMismatch: boolean = false;
  accountTaken: boolean = false;

  constructor(private firestoreService: FirestoreService) { }

  createFormControls() {
    this.firstName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern("^[a-zA-Z'-]*$")]);
    this.lastName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern("^[a-zA-Z'-]*$")]);
    this.email = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]);
    this.password =  new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.confirmPassword =  new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
  }

  onSubmit(newUser: RegisterUser) {
    if(this.registerForm.valid) {
      if(newUser.password == newUser.confirmPassword) {
        this.passwordMismatch = false;
        this.user = new User(newUser.firstName, newUser.lastName, newUser.email, newUser.password);
        this.firestoreService.checkIfUserExists(this.user.email).then(result => {
          this.accountTaken = result;
          if(!result) {
            this.firestoreService.registerUser(this.user).then(res => {});
            this.registerForm.reset();
          } 
        });
        
      } else {
        this.passwordMismatch = true;
      }
    }
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

}