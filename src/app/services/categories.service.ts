import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

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
    return collectionData(collectionInstance, { idField: 'id' }) as Observable<
      { id: string; category: string }[]
    >;
  }

  updateData(id: string, editData: any) {
    const docInstance = doc(this.firestore, 'categories', id);
    updateDoc(docInstance, editData)
      .then(() => {
        this.toastr.success('Data updated successfully...!!!');
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }
}
