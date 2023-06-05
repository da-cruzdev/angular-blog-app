import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private firestore: Firestore) {}
  ngOnInit(): void {}

  onSumit(formData: any): void {
    let categoryData = {
      category: formData.value.category,
    };
    const collectionData = collection(this.firestore, 'categories');
    addDoc(collectionData, categoryData)
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
