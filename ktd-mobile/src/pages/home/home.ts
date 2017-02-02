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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  active_session: any;
  startForm: any;
  duration: number;
  nbPeople: number;
  data: any;
  link: string;
  answer: any;
  mopidy: any;
  zone: any;


  constructor(public navCtrl: NavController, public http: Http, public _form: FormBuilder, public globalVariables: GlobalVariables, private alertCtrl: AlertController) {


    this.duration = 50;
    this.nbPeople = 20;
    this.startForm = this._form.group({
      "username": ["Justpourrentrerdirect", Validators.required],
      "backendUrl": ["http://localhost:6680", Validators.required],
    });
  }

  sendForm() {
    this.globalVariables.username = this.startForm.value.username;
    this.globalVariables.backendUrl = this.startForm.value.backendUrl;

    this.http.get(this.globalVariables.backendUrl + '/killthedj/session',).map(res => res.json()).subscribe(data => {

      if (data.active) {
        if (!this.globalVariables.cookie) {
          //si la sessionnest active, on ajoute l'utilisateur
          this.link = this.globalVariables.backendUrl + '/killthedj/session/users';
          //this.data = JSON.stringify({username: this.data.username});
          this.data = JSON.stringify(
            {
              "username": this.startForm.value.username
            });

          this.http.post(this.link, this.data,).map(res => res.json()).subscribe(data => {
            this.answer = data;
            this.globalVariables.cookie = this.answer.cookie;
            let headers: Headers = new Headers();
            headers.append('X-KTD-Cookie', this.globalVariables.cookie);
            this.globalVariables.header = headers;
            this.goMenu();
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
        else{
          console.log('already co')
          this.goMenu();
        }
      }
      //Sinon il est ajouté en même temps que les settings de la session
      else {
        console.log('heyehyey')
        this.goPreset();
      }


    });

  }


  goPreset() {
    this.navCtrl.push(PresetPage)
  }

  goMenu() {
    this.navCtrl.setRoot(MenuPage)
  }
}
