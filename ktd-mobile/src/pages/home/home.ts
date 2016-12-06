import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import { UsersPage } from '../users/users';
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

  posts: any;

  constructor(public navCtrl: NavController, public http: Http) {

      this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
        this.posts = data.data.children;
      });

    //this.http.get('http://localhost:6680/killthedj/').map(res => res.json()).subscribe(data => {
    //  this.posts = data.data.children;
    //});

  }

  changePage(){
    this.navCtrl.push(UsersPage);
  }

}
