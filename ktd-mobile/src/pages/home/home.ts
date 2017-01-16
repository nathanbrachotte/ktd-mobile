import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { NavController} from 'ionic-angular';

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
  startForm: any;
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
    this.startForm = this._form.group({
      "username":["Justpourrentrerdirect", Validators.required],
    })

  }
  sendForm() {
    console.log(this.startForm.value.username);
    if(this.active_session)
    {
      //si la sessionnest active, on ajoute l'utilisateur
      this.link = 'http://localhost:6680/killthedj/session/users';
      //this.data = JSON.stringify({username: this.data.username});
      this.data = JSON.stringify(
        {
          "username": this.startForm.value.username
        });

      this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
        this.answer = data;
      }, error => {
        console.log("User creation failed!");
      });
      this.goMenu(this.startForm.value.username);
    }
    //Sinon il est ajouté en même temps que les settings de la session
    else
    {
      this.goPreset(this.startForm.value.username);
    }
  }


  goPreset(name_user:any)
  {
    this.navCtrl.push(PresetPage,{
      name: name_user
    });
  }

  goMenu(name_user:any)
  {
    this.navCtrl.setRoot(MenuPage,{
      name: name_user
    });
  }
}
