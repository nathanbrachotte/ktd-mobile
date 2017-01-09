import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import { UsersPage } from '../users/users';
import { MenuPage } from '../menu/menu';

//
//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  menuPage = MenuPage;
  posts: any;
  post: string;

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get('http://localhost:6680/killthedj/session').map(res => res.json()).subscribe(data => {
      this.posts = data.active;
      console.log(this.posts);
    });
  }

  goUsers() {
    this.navCtrl.pop(UsersPage);
  }

  goAdd() {
    this.navCtrl.push(UsersPage);
  }

  goSettings(){
    this.navCtrl.push(MenuPage);
  }
}
