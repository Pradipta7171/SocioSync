import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../../tools/create-post/create-post.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { ExitconfirmComponent } from 'src/app/tools/exitconfirm/exitconfirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent {
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
  auth = new FirebaseTSAuth();

  constructor(private dialog: MatDialog,
  private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick() {
    this.dialog.open(CreatePostComponent);
  }

  onExitConfirmclick() {
    this.dialog.open(ExitconfirmComponent)
  }

  getPosts() {
    this.firestore.getCollection(
      {
        path: ["Posts"],
        where: [
          new OrderBy("timestamp", "desc"),
          new Limit(15)
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let post = <PostData>doc.data();
              post.postId = doc.id;
              this.posts.push(post);
            }
          );
        },
        onFail: err => {

        }
      }
    );
  }

}

export interface PostData {
  comment: string;
  creatorid: string;
  imageUrl?: string;
  postId: string;
}
