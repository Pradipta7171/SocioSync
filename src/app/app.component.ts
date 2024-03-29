import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SocioSync';
  auth = new FirebaseTSAuth();
  isLoggedIn = false;
  showWelcomeMessage = false;
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  private static userDocument?: UserDocument;
  


  constructor(private loginsheet: MatBottomSheet,
     private router: Router
    ) {
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              this.isLoggedIn = true;
            },
            whenSignedOut: user => {
              AppComponent.userDocument = undefined;
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.getUserProfile();
            },
            whenChanged: user => {

            }         
          }
        );
      }
    );
  }

  public static getUserDocument() {
    return AppComponent.userDocument;
  }

  getUsername() {
    try {
      return AppComponent.userDocument?.publicName;
    } catch (err) {
      console.error('Error occurred while accessing publicName:', err);
      return null; 
    }
  }
  



  getUserProfile(){
    this.firestore.listenToDocument(
      {
        name: "Getting Document",
        path: ["Users", this.auth.getAuth()?.currentUser?.uid || 'default-value'],
        onUpdate: (result) => {
          AppComponent.userDocument = <UserDocument>result.data();
          this.userHasProfile = result.exists;
          AppComponent.userDocument.userId = this.auth.getAuth().currentUser!.uid;
          if(this.userHasProfile) {
            this.router.navigate(["postfeed"]);
          }
        }
      }
    );
  }

  onLogoutClick(){
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  loggedIn(){
    return this.auth.isSignedIn();
  }


  onLoginClick() {
    this.loginsheet.open(AuthenticatorComponent);
  }

  showWelcome() {
    this.showWelcomeMessage = true;
  }

  hideWelcome() {
    this.showWelcomeMessage = false;
  } 
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}
