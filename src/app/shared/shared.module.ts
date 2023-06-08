import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNavbarComponent } from './layouts/category-navbar/category-navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { PostCardComponent } from './layouts/post-card/post-card.component';

const components = [
  CategoryNavbarComponent,
  FooterComponent,
  HeaderComponent,
  PostCardComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class SharedModule {}
