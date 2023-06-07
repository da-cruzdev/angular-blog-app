import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
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

  uploadImage(selectedImage: any, postData: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImage).then(() => {
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          this.saveData(postData);
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
}
