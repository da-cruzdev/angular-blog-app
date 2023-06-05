import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories!: Observable<{ category: string }[]>;
  constructor(private categoryService: CategoriesService) {}
  ngOnInit(): void {
    this.categories = this.categoryService.getData$();
  }

  onSubmit(formData: any): void {
    let categoryData: Category = {
      category: formData.value.category,
    };

    this.categoryService.saveData(categoryData);

    formData.reset();
  }
}
