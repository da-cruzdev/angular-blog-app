import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    DashboardComponent,
    AllPostsComponent,
    NewPostComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class AdminModule {}
