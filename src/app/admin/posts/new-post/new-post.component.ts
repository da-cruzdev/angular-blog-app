import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  constructor() {}

  ngOnInit(): void {}

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }
}
