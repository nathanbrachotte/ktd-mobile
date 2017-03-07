import { Component } from '@angular/core';
import {NavController, NavParams, Header} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import { ServicePage } from '../service/service';
import { GlobalVariables } from '../../services/global_variables';

//HTTP PART
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {MenuPage} from "../menu/menu";

/*
  Generated class for the Preset page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-preset',
  templateUrl: 'preset.html'
})
export class PresetPage {

  public presetForm: any;
  public  session_length: number;
  public  nbPeople: number;
  public max_votes: number;
  private data: any;
  private link: string;
  private answer: any;

  constructor(public navCtrl: NavController, public _form:FormBuilder, public http: Http,public params:NavParams, public globalVariables: GlobalVariables)
  {
    this.session_length= 50;
    this.nbPeople= 20
    this.max_votes= 5;
    this.presetForm = this._form.group({
      "session_name":["n", Validators.required],
      "session_length":["", Validators.required],
      "max_votes":["", Validators.required],
      "nb_people":["", Validators.required],
      "admin_username": [this.globalVariables.username, Validators.required],
    })
  }

  sendForm() {
    this.link = this.globalVariables.backendUrl+'/killthedj/session';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify(this.presetForm.value);

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      this.answer = data;
      this.globalVariables.cookie = this.answer.admin_user.cookie;
      let headers: Headers = new Headers();
      headers.append('X-KTD-Cookie', this.globalVariables.cookie);
      this.globalVariables.header = headers;
      localStorage.setItem("cookie", this.answer.admin_user.cookie);
      localStorage.setItem("username", this.globalVariables.username);
      localStorage.setItem("is_admin", "true");
      this.goMenu();
    }, error => {
      console.log("Oooops!");
      //location.reload()
    });

  }

  goMenu()
  {
    this.navCtrl.push(MenuPage);
  }
}
