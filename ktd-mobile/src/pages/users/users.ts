import {Component} from '@angular/core';

import {NavController, NavParams, AlertController} from 'ionic-angular';
import {GlobalVariables} from '../../services/global_variables';

//HTTP PART
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
//

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  username: any;
  listname: Array<{username: any, points: number, removable: any}>;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  i: any;
  data: any;

  constructor(public navCtrl: NavController, public params: NavParams, public http: Http, public globalVariables: GlobalVariables, private alertCtrl: AlertController) {
    this.username = params.get("name");
    console.log(this.username);
    this.getListUser();
    this.items = [];
  }

  getListUser() {
    this.listname = [];
    this.http.get(this.globalVariables.backendUrl + '/killthedj/session/users', {headers: this.globalVariables.header})
      .map(res => {
        return res.json().map((item) => {
          console.log(item.username);
          this.listname.push(
            {
              username: item.username,
              points: item.points,
              removable: localStorage.getItem("is_admin") == "true",
            });
          return item;
        })
      })
      .subscribe(data => {
        console.log(data);
      });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getListUser();
      refresher.complete();
    }, 1000);
  }


  remove(user) {
    console.log('fdsjlnnnnnn')
    this.data = JSON.stringify(
      {
        "username": user.username,
      });

    this.http.post(this.globalVariables.backendUrl + '/killthedj/delUser', this.data, {headers: this.globalVariables.header}).map(res => res.json()).subscribe(data => {
      this.getListUser()
    }, error => {
      console.log("Oooops!");
    });
  }

}
