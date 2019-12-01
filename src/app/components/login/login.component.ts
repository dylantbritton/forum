import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;


  constructor(private firestoreService: FirestoreService) { }

  createFormControls() {
    this.email = new FormControl('', Validators.required);
    this.password =  new FormControl('',Validators.required);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    })
  }

  onSubmit(user: User) {
      
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

}
