import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: Firestore,
    private toastr: ToastrService
  ) {}

  uploadImage(selectedImage: any, postData: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Post image uploaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          console.log(postData);

          this.saveData(postData);
        });
    });
  }

  saveData(postData: any) {
    const collectionData = collection(this.firestore, 'posts');
    addDoc(collectionData, postData).then(() => {
      this.toastr.success('Post saved successfully...!!');
    });
  }
}
