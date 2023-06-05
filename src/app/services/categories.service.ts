import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

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
        this.toastr.error(err);
      });
  }

  getData$() {
    const collectionInstance = collection(this.firestore, 'categories');
    return collectionData(collectionInstance) as Observable<
      { category: string }[]
    >;
  }
}
