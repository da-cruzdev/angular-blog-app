import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryList } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = '/assets/placeholder-image.jpg';
  selectedImg!: any;
  categories!: CategoryList;

  postForm!: FormGroup;
  post!: any;
  formStatus: string = 'Add new';
  postId!: string;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) => {
      this.postId = val['id'];
      this.postService.getOnePost$(val['id']).subscribe((postData) => {
        this.post = postData;

        this.postForm = this.fb.group({
          title: [
            this.post.title,
            [Validators.required, Validators.minLength(10)],
          ],
          permalink: [{ value: this.post.permalink }, Validators.required],
          excerpt: [
            this.post.excerpt,
            [Validators.required, Validators.minLength(50)],
          ],
          category: [
            `${this.post.category.categoryId}-${this.post.category.category}`,
            Validators.required,
          ],
          postImg: ['', Validators.required],
          content: [this.post.content, Validators.required],
        });

        this.imgSrc = this.post.postImgPath;
        this.formStatus = 'Edit';
      });
    });
  }

  ngOnInit(): void {
    this.categoryService.getData$().subscribe((val) => (this.categories = val));
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splited = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splited[0],
        category: splited[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postService.uploadImage(
      this.selectedImg,
      postData,
      this.formStatus,
      this.postId
    );

    this.postForm.reset();
    this.imgSrc = '/assets/placeholder-image.jpg';
  }
}
