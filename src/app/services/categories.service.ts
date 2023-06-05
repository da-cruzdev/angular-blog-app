import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  saveData(data: any) {
    const collectionData = collection(this.firestore, 'categories');
    addDoc(collectionData, data)
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
