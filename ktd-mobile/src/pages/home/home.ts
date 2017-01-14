import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
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
  active_session: any;
  presetForm: any;
  duration: number;
  nbPeople: number;
  data: any;
  link: string;
  answer: any;


  constructor(public navCtrl: NavController, public http: Http, public _form:FormBuilder)
  {
    this.http.get('http://localhost:6680/killthedj/session').map(res => res.json()).subscribe(data => {
      this.active_session = data.active;
      console.log(this.active_session);
    });

    this.duration= 50;
    this.nbPeople= 20;
    this.presetForm = this._form.group({
      "session_name":["My amazing party!!", Validators.required],
    })

  }
  sendForm() {
    console.log(this.presetForm.value.session_name);
    this.link = 'http://localhost:6680/killthedj/session/users';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify(
      {
        "username": this.presetForm.value.session_name
      });

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      this.answer = data;
    }, error => {
      console.log("Oooops!");
    });
    if(this.active_session)
    {
      this.goMenu();
    }
    else
    {
      this.goPreset();
    }
  }


  goPreset()
  {
    this.navCtrl.push(PresetPage);
  }

  goMenu()
  {
    this.navCtrl.setRoot(MenuPage);
  }

  switchActive()
  {
    if(this.active_session)
    {
      this.active_session = false;
    }
    else
    {
      this.active_session = true;
    }
  }

}
