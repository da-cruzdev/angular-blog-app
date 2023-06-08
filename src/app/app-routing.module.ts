import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/pages/home/home.component';
import { SingleCategoryComponent } from './client/pages/single-category/single-category.component';
import { SinglePostComponent } from './client/pages/single-post/single-post.component';
import { AboutUsComponent } from './client/pages/about-us/about-us.component';
import { ContactUsComponent } from './client/pages/contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './client/pages/terms-and-conditions/terms-and-conditions.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AllPostsComponent } from './admin/posts/all-posts/all-posts.component';
import { NewPostComponent } from './admin/posts/new-post/new-post.component';
import { LoginComponent } from './admin/auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'category', component: SingleCategoryComponent },
  { path: 'post', component: SinglePostComponent },

  { path: 'about', component: AboutUsComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'contact', component: ContactUsComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/categories', component: CategoriesComponent },
  { path: 'dashboard/posts', component: AllPostsComponent },
  { path: 'dashboard/posts/new', component: NewPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
