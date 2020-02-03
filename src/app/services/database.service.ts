import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../classes/post/post';
import { Comment } from '../classes/comment/comment';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  public allPosts: Post[] = [];
  public notifications = 0;


  //replace the following configs with yours
  private firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  };

  constructor() { }

  firebaseInit() {
    return firebase.initializeApp(this.firebaseConfig);
  }

  addPostDB(post: Post) {
    return firebase.database().ref('posts/' + post.key).set(post).then(() => {
      this.allPosts.push(post);
    });
  }

  countLike(index: number) {
    if (!this.allPosts[index].likes) {
      this.allPosts[index].likes = 0;
    }
    this.allPosts[index].likes++;
    return firebase.database().ref('posts/' + this.allPosts[index].key).update(this.allPosts[index])
      .then(() => {
        this.notifications++;
        this.updateNotifications(this.notifications);
      })
      .catch(() => {
        this.allPosts[index].likes--;
      });
  }

  notificationsListener() {
    return firebase.database().ref('notifications/').on('value', (snapshot) => {
      this.notifications = snapshot.val()
    });
  }

  updateNotifications(counter: number) {
    return firebase.database().ref('notifications/').set(counter);
  }

  getAllPosts() {
    let allPostsRef = firebase.database().ref('posts').orderByChild('timestamp');
    allPostsRef.on('value', (snapshot) => {
      this.allPosts = []; // to make sure it's empty before appending all elements
      snapshot.forEach((childSnapshot) => {

        let childData = childSnapshot.val();
        if (childData.comments) {
          let commentsArray = Object.keys(childData.comments).map((commentKey) => {
            let comment = childData.comments[commentKey];
            return comment;
          });
          childData.comments = commentsArray;
        }
        this.allPosts.push(childData);
      });
    });
  }

  deletePost(index: number) {
    let post_ref = firebase.database().ref('posts/' + this.allPosts[index].key);
    return post_ref.remove().then(() => {
      this.allPosts.splice(index, 1);
    });
  }

  addComment(comment: Comment, index: number) {
    if (!this.allPosts[index].comments) {
      this.allPosts[index].comments = [];
    }
    this.allPosts[index].comments.push(comment);
    return firebase.database().ref('posts/' + this.allPosts[index].key + '/comments').set(this.allPosts[index].comments)
      .catch(() => {
        this.allPosts[index].comments.pop();
      });
  }

  deleteComment(post_index: number, comment_index: number) {
    let post_key = this.allPosts[post_index].key;
    let comment = this.allPosts[post_index].comments[comment_index];
    this.allPosts[post_index].comments.splice(comment_index, 1);
    return firebase.database().ref('posts/' + post_key + '/comments').set(this.allPosts[post_index].comments).catch(() => {
      this.allPosts[post_index].comments.push(comment);
    })
  }
}
