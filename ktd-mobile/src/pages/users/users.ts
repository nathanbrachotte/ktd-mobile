import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  selectedItem: any;
  username: any;
  listname: any;
  listnameArray: Array<{users:string}>;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  i : any;

  constructor(public navCtrl: NavController,public params:NavParams, public http: Http)
  {
    this.username = params.get("name");
    console.log(this.username);
    this.getListUser();

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.listnameArray = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  getListUser()
  {
    this.http.get('http://localhost:6680/killthedj/session/users').map(res => res.json()).subscribe(data => {
      this.listname = data;
      console.log(this.listname);

    });

    for(let x of this.listname){
      console.log(x);
    }
  }

}
