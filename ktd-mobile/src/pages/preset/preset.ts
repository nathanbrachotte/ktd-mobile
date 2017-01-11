import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import { ServicePage } from '../service/service';

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

  public registrationForm: any;
  constructor(public navCtrl: NavController, public _form:FormBuilder)
  {
    this.registrationForm = this._form.group({
      "duration":["", Validators.required],
      "timebetween":["", Validators.required],
      "peoplemax":["", Validators.required],
      "votepersong":["", Validators.required],
    })
  }

  goService() {
    this.navCtrl.push(ServicePage);
  }

}
