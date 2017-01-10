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
  answer: any;
  link : string;
  data : any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get('http://localhost:6680/killthedj/session').map(res => res.json()).subscribe(data => {
      this.posts = data.active;
      console.log(this.posts);
    });
    this.submit();
    this.upvote();


  }


  submit() {

    this.link = 'http://localhost:6680/killthedj/searches';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify({
      "query": {
        "track_name": [
          "Une ba"
        ]
      }
    });

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
        this.answer = data[0].tracks;
      }, error => {
        console.log("Oooops!");
      });
  }


  upvote() {

    this.link = 'http://localhost:6680/killthedj/searches';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify({
      "query": {
        "track_name": [
          "Un"
        ]
      }
    });

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      this.answer = data[0].tracks;
    }, error => {
      console.log("Oooops!");
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
