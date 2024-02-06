import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReplyComponent } from '../reply/reply.component';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() postData?: PostData; 

  constructor(private router: Router,
    private dialog: MatDialog) {}

  navigateToHome() {
    this.router.navigate([]);
  }

  navigateToExplore() {
    this.router.navigate([]);
  }

  navigateToNotifications() {
    this.router.navigate([]);
  }

  navigateToMessages() {
    this.onReplyClick();
  }

  navigateToBookmarks() {
    this.router.navigate([]);
  }

  navigateToAnalytics() {
    this.router.navigate([]);
  }

  navigateToThemes() {
    this.router.navigate([]);
  }

  navigateToFriends() {
    this.router.navigate([]);
  }

  navigateToGroups() {
    this.router.navigate([]);
  }

  navigateToMarketplace() {
    this.router.navigate([]);
  }

  navigateToWatch() {
    const newVideoLink = 'https://firebasestorage.googleapis.com/v0/b/pychosync.appspot.com/o/share.mp4?alt=media&token=883319f1-9a94-4380-b8cf-ceb6d3dd711e';
    window.location.href = newVideoLink;
  }

  navigateToSettings() {
    this.router.navigate([]);
  }

  onReplyClick() {
    this.dialog.open(ReplyComponent, { data: this.postData?.postId });
  }

}
