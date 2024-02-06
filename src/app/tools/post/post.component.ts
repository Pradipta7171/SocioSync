import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('bookmarkAnimation', [
      state('bookmarked', style({
        transform: 'scale(1.2)',
        color: 'pink' 
      })),
      state('unbookmarked', style({
        transform: 'scale(1)',
        color: 'pink'
      })),
      transition('unbookmarked => bookmarked', [
        animate('0.2s')
      ]),
      transition('bookmarked => unbookmarked', [
        animate('0.2s')
      ])
    ]),

    trigger('likeAnimation', [
      state('liked', style({
        transform: 'scale(1.2)',
        color: 'red'
      })),
      state('unliked', style({
        transform: 'scale(1)',
        color: 'red'
      })),
      transition('unliked => liked', [
        animate('0.2s')
      ]),
      transition('liked => unliked', [
        animate('0.2s')
      ])
    ])
  ]
})

export class PostComponent {

  @Input() postData?: PostData; 
  creatorName?: string;
  creatorDescription?: string; 
  firestore = new FirebaseTSFirestore();
  likeState: string = 'unliked';
  bookmarkState: string = 'unbookmarked';

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.getCreatorInfo();
  }

  onBookmarkClick() {
    this.bookmarkState = (this.bookmarkState === 'bookmarked') ? 'unbookmarked' : 'bookmarked';
  }


  onLikeClick() {
    this.likeState = (this.likeState === 'liked') ? 'unliked' : 'liked';
  }

  onReplyClick() {
    this.dialog.open(ReplyComponent, {data: this.postData?.postId});
  }

  onSaveToDesktop() {
    const imageSrc = this.postData?.imageUrl;
    if (imageSrc) {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = 'post_image.jpg';
      link.target = '_blank'; 
      link.click();
    }
  }

  getCreatorInfo() {
    this.firestore.getDocument({
      path: ["Users", this.postData?.creatorid || "default-value"],
      onComplete: result => {
        let userDocument = result.data();
        this.creatorName = userDocument?.['publicName'] || "default-name";
        this.creatorDescription = userDocument?.['description'] || "default-description";
      }
    });
  }
}  


