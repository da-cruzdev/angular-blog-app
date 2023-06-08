import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  posts!: Observable<any>;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postService.getData$();
  }

  onDelete(id: string, postImgPath: string) {
    this.postService.deleteImage(postImgPath, id);
  }
  onFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };

    this.postService.markFeatured(id, featuredData);
  }
}
