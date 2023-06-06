import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories!: Observable<{ id: string; category: string }[]>;
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId!: string;

  constructor(private categoryService: CategoriesService) {}
  ngOnInit(): void {
    this.categories = this.categoryService.getData$();
  }

  onSubmit(formData: any): void {
    let categoryData: Category = {
      category: formData.value.category,
    };

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);

      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
    }
  }

  onEdit(category: string, id: string) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
