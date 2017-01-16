import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import { ServicePage } from '../service/service';

//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  public  duration: number;
  public  nbPeople: number;
  private data: any;
  private link: string;
  private answer: any;
  private username: any;

  constructor(public navCtrl: NavController, public _form:FormBuilder, public http: Http,public params:NavParams)
  {
    this.username = params.get("name");
    console.log(this.username);
    this.duration= 50;
    this.nbPeople= 20;
    this.presetForm = this._form.group({
      "session_name":["n", Validators.required],
      "duration":["", Validators.required],
      "nb_people":["", Validators.required],
      "admin_username": [this.username, Validators.required],
    })
  }

  sendForm() {
    console.log(this.presetForm.value);
    this.link = 'http://localhost:6680/killthedj/session';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify(this.presetForm.value);

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      this.answer = data;
      this.goService(this.username);
    }, error => {
      console.log("Oooops!");
      location.reload()
    });

  }

  goService(name_user:any)
  {
    this.navCtrl.push(ServicePage,{
      name: name_user
    });
  }
}
