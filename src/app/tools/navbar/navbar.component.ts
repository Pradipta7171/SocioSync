import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  darkMode: boolean = false;
  currentUser = {

  };

  constructor() { }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

  };
}
