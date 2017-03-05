import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NavController, AlertController} from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import {MenuPage} from '../menu/menu';
import {PresetPage} from '../preset/preset';

//
//HTTP PART
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {GlobalVariables} from '../../services/global_variables';
import {errorHandler} from "@angular/platform-browser/src/browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  active_session: any;
  startForm: any;
  data: any;
  link: string;
  answer: any;


  constructor(public navCtrl: NavController, public http: Http, public _form: FormBuilder, public globalVariables: GlobalVariables, private alertCtrl: AlertController) {
    let user = "user";
    if (localStorage.getItem("username")) {
      user = localStorage.getItem("username");
    }
    let backend = "http://localhost:6680"
    if (localStorage.getItem("backendUrl") && localStorage.getItem("cookie")) {
      backend = localStorage.getItem("backendUrl");
      this.globalVariables.backendUrl = backend;
      this.http.get(this.globalVariables.backendUrl + '/killthedj/session').map(res => res.json()).subscribe(data => {
        if (data.active) {
            this.globalVariables.cookie = localStorage.getItem("cookie");
            let headers: Headers = new Headers();
            headers.append('X-KTD-Cookie', this.globalVariables.cookie);
            this.globalVariables.header = headers;
            this.http.get(this.globalVariables.backendUrl + '/killthedj/session/users' , {headers: this.globalVariables.header})
              .subscribe(data => {
                this.goMenu();
              }, error => {

              });
          }
      });


    }
    this.startForm = this._form.group({
      "username": [user, Validators.required],
      "backendUrl": [backend, Validators.required],
    });
  }

  sendForm() {
    this.globalVariables.username = this.startForm.value.username;
    this.globalVariables.backendUrl = this.startForm.value.backendUrl;
    localStorage.setItem("backendUrl", this.globalVariables.backendUrl)
    this.http.get(this.globalVariables.backendUrl + '/killthedj/session',).map(res => res.json()).subscribe(data => {

      if (data.active) {

        this.connect()
      }
      //Sinon il est ajouté en même temps que les settings de la session
      else {
        this.goPreset();
      }


    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error server',
        subTitle: 'Server unreachable',
        buttons: ['Dismiss']
      });
      alert.present();
    });

  }


  connect() {
    this.link = this.globalVariables.backendUrl + '/killthedj/session/users';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify(
      {
        "username": this.startForm.value.username
      });

    this.http.post(this.link, this.data,).map(res => res.json()).subscribe(data => {
      this.answer = data;
      this.globalVariables.cookie = this.answer.cookie;
      console.log(this.answer.cookie)
      let headers: Headers = new Headers();
      headers.append('X-KTD-Cookie', this.globalVariables.cookie);
      this.globalVariables.header = headers;
      localStorage.setItem("cookie", this.answer.cookie);
      localStorage.setItem("username", this.startForm.value.username);
      this.goMenu()
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error username',
        subTitle: 'This username is already used!',
        buttons: ['Dismiss']
      });
      alert.present();
      console.log("User creation failed!");
    });
  }


  goPreset() {
    this.navCtrl.push(PresetPage)
  }

  goMenu() {
    this.navCtrl.setRoot(MenuPage)
  }
}
