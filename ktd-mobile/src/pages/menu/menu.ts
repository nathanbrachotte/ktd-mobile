import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import { UsersPage } from '../users/users';
import { AddPage } from '../add/add';
//
//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  link : string;
  data : any;
  answer: any;

  constructor(public navCtrl: NavController, public http: Http)
  {


    this.upvote();
  }

  goAdd() {
    this.navCtrl.push(AddPage);
  }
  goUsers() {
    this.navCtrl.push(UsersPage);
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

}
