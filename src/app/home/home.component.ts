import { Component, OnInit } from '@angular/core';
import { Post } from '../classes/post/post';
import * as uuid from 'uuid';
import { DatabaseService } from '../services/database.service';
import { Comment } from '../classes/comment/comment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getAllPosts();
    this.db.notificationsListener();
  }

  addPost(content: string) {
    console.log("add post func");
    if (content == null || content.trim() == '') {
      alert("Can't post an empty post!");
      return;
    }
    let new_post: Post = {
      key: uuid.v4(),
      comments: [],
      content: content,
      timestamp: Date.now(),
      likes: 0
    }
    this.db.addPostDB(new_post).catch(() => {
      this.connectionErr();
    });
  }

  deletePost(index: number) {
    console.log("delete post func");
    this.db.deletePost(index).catch(() => {
      this.connectionErr();
    });
  }

  countLike(index: number) {
    console.log("count like func");
    this.db.countLike(index).catch(() => {
      this.connectionErr();
    })
  }

  addComment(comment: string, index: number) {
    if (comment == null || comment.trim() == '') {
      alert("Can't post an empty comment!");
      return;
    }
    let new_comment: Comment = {
      key: uuid.v4(),
      content: comment,
      timestamp: Date.now()
    };
    this.db.addComment(new_comment, index).catch(() => {
      this.connectionErr();
    })
  }

  deleteComment(post_index: number, comment_index: number) {
    this.db.deleteComment(post_index, comment_index).catch(() => {
      this.connectionErr();
    });
  }

  connectionErr() {
    alert("Check your enternet connection and try a again.");
  }
}
