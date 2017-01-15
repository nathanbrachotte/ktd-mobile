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

  username: any;
  listname: Array<{username:any}>;
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
    this.listname = [];
    this.http.get('http://localhost:6680/killthedj/session/users')
      .map(res => {
        return res.json().map((item) => {
          console.log(item.username);
          this.listname.push(
            {
              username: item.username
            });
          return item;
        })
      })
      .subscribe(data => {
        console.log(data);
      });


    //this.http.get('http://localhost:6680/killthedj/session/users').map(res => res.json()).subscribe(data => {
     // this.listname = data;
      //console.log(this.listname);
      //console.log(this.listname["Nat"]);
      //console.log(this.listname.user[0]);

    //});
  }

}
