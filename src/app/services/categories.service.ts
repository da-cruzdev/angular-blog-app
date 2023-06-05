import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  saveData(data: any) {
    const collectionData = collection(this.firestore, 'categories');
    addDoc(collectionData, data)
      .then(() => {
        console.log('Data saved successfully');
        this.toastr.success('Data insert successfully...!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
