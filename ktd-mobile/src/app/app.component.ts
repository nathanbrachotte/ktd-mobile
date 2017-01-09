import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users';
import { MenuPage } from '../pages/menu/menu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.pages = [
        { title: 'Hello Ionic', component: HomePage },
        { title: 'My First List', component: UsersPage },
        { title: 'Menu', component: MenuPage }
      ];
    });
  }
}
