import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

/*
  Generated class for the Service page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-service',
  templateUrl: 'service.html'
})
export class ServicePage {

  constructor(public navCtrl: NavController,public params:NavParams)
  {

  }

  goMenu()
  {
    this.navCtrl.setRoot(MenuPage);
  }
}
