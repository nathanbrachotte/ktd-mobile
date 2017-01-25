import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import { UsersPage } from '../users/users';
import { AddPage } from '../add/add';
//
//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//


import { GlobalVariables } from '../../services/global_variables';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  songs: Array<{title: any, artist: any, length: any, votes:any}>;
  items: Array<{title: string, note: string, icon: string}>;
  link : string;
  data : any;


  constructor(public navCtrl: NavController, public http: Http,public params:NavParams, public globalVariables: GlobalVariables)
  {
    //this.upvote();
    console.log(globalVariables.username)
    this.songs = [];
    this.displaySongs();
  }

  ionViewWillEnter() {
    this.songs = [];
    this.displaySongs()
  }

  goAdd() {
    this.navCtrl.push(AddPage);
  }
  goUsers()
  {
    this.navCtrl.push(UsersPage);
  }

  displaySongs()
  {
    this.http.get(this.globalVariables.backendUrl+'/killthedj/tracklist/tracks')
      .map(res => {
        return res.json().map((item) => {
          //console.log(item.track[0].name);
          //console.log(item.track[0].artists[0].name);
          console.log(item.votes);
          this.songs.push(
            {
              title: item.track[0].name,
              artist: item.track[0].artists[0].name,
              length: item.track[0].length,
              votes: item.votes
            });
          return item;
        })
      })
      .subscribe(data => {
        console.log(data);
      });

  }





  upvote() {


  }

}
