import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import { MenuPage } from '../menu/menu';
import { PresetPage } from '../preset/preset';

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
    this.http.get('http://localhost:6680/killthedj/session').map(res => res.json()).subscribe(data => {
      this.posts = data.active;
      console.log(this.posts);
    });
  }

  goPreset() {
    this.navCtrl.push(PresetPage);
  }

  goMenu() {
    this.navCtrl.setRoot(MenuPage);
  }

  switchActive() {
    if(this.posts == true)
    {
      this.posts = false;
    }
    else
    {
      this.posts = true;
    }
  }

}
