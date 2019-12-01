import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

// interface User {
//   uid: string;
//   email: string;
//   firstName: string;
//   lastName: string;
// }

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

 user: Observable<User>;
 authState: any = null;

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    // this.user = this.afAuth.authState.pipe(switchMap( user => {
    //   if(user) {
    //     return this.firestore.doc<User>('users/$user.uid}').valueChanges()
    //   } else {
    //     return of(null)
    //   }
    // } ))
  }

  login(email: string, password: string) {
   // const provider = new firebase.auth.EmailAuthProvider();
   console.log('email: '+ email + ' password: ' + password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
         this.updateUserData()
       })
       .catch(error => console.log(error));
  }

  private updateUserData(): void {
   
      let path = `users/${this.currentUserId}`; 
      let data = {
                    email: this.authState.email,
                    name: this.authState.displayName
                  }
  
      this.db.object(path).update(data)
      .catch(error => console.log(error));
  
    }

    get authenticated(): boolean {
      return this.authState !== null;
    }

    get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }

  logout() {
    firebase.auth().signOut().then(function() {
      
    }).catch(function(error) {
      
    });
  }

  // private oAuthLogin(provider, email, password) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((credential) => {
  //       this.updateUserData(credential.user)
  //     })
  // }

  // private updateUserData(user) {
  //   const userRef: AngularFirestoreDocument<User> = this.firestore.doc('users/${user.uid}');

  //   return userRef;
  // }

  

  checkIfUserExists(email: string) {
    return new Promise<any>(
      (resolve, reject) => {
        this.firestore
        .collection("users", ref => ref
        .where('email', '==', email))
        .snapshotChanges()
        .subscribe(res => {
          if(res.length > 0){
            resolve(true);
          } else {
            resolve(false);
          }
        }, err => reject(err))
      });
  }

  registerUser(newUser: User) {
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("users")
            .add(JSON.parse(JSON.stringify(newUser)))
            .then(res => {}, err => reject(err));
    });
  }

}