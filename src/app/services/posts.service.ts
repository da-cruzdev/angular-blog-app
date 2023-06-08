import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(
    selectedImage: any,
    postData: any,
    formStatus: string,
    id: string
  ) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImage).then(() => {
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    const collectionData = collection(this.firestore, 'posts');
    addDoc(collectionData, postData).then(() => {
      this.toastr.success('Post saved successfully...!!');

      this.router.navigate(['/dashboard/posts']);
    });
  }

  getData$() {
    const collectionInstance = collection(this.firestore, 'posts');
    return collectionData(collectionInstance, {
      idField: 'id',
    }) as Observable<any>;
  }

  getOnePost$(id: string) {
    const onePost = doc(this.firestore, 'posts', id);
    return docData(onePost, { idField: 'id' });
  }

  updateData(id: string, postData: any) {
    const docInstance = doc(this.firestore, 'posts', id);
    updateDoc(docInstance, postData)
      .then(() => {
        this.toastr.success('Data updated successfully...!!!');
        this.router.navigate(['/dashboard/posts']);
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }
}
