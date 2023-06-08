import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SharedModule } from '../shared/shared.module';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { CommentListComponent } from './components/comments/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';

const components = [
  HomeComponent,
  SingleCategoryComponent,
  SinglePostComponent,
  AboutUsComponent,
  TermsAndConditionsComponent,
  ContactUsComponent,
  SubscriptionFormComponent,
  CommentListComponent,
  CommentFormComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule],
  exports: [...components],
})
export class ClientModule {}
