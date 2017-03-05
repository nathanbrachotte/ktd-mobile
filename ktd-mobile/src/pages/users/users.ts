import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { GlobalVariables } from '../../services/global_variables';

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

  constructor(public navCtrl: NavController,public params:NavParams, public http: Http, public globalVariables: GlobalVariables)
  {
    this.username = params.get("name");
    console.log(this.username);
    this.getListUser();
    this.items = [];
  }

  getListUser()
  {
    this.listname = [];
    this.http.get(this.globalVariables.backendUrl+'/killthedj/session/users', {headers: this.globalVariables.header})
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
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getListUser();
      refresher.complete();
    }, 1000);
  }


}
