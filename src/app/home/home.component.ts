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
    this.posts.push(post);
  }

}
