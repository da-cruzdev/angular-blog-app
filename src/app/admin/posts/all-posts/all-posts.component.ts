import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

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

  onEdit() {}
}
