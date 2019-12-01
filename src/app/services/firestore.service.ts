import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private clientRef: DocumentReference;
  user$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {}

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
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("users")
            .add(JSON.parse(JSON.stringify(newUser)))
            .then(res => {}, err => reject(err));
    });
  }

}