import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts = [];
  constructor() { }

  ngOnInit() {
  }

  addPost(post: string) {
    if (post == null || post.trim() == '') {
      alert("Can't post an empty post!");
      return;
    }
    this.posts.push(post);
  }

}
