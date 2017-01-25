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

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  songs: Array<{title: any, artist: any, length: any, votes:any}>;
  items: Array<{title: string, note: string, icon: string}>;
  link : string;
  data : any;
  username : any;


  constructor(public navCtrl: NavController, public http: Http,public params:NavParams)
  {
    //this.upvote();
    this.songs = [];
    this.username = params.get("name");
    console.log(this.username);
    this.displaySongs();

  }

  ionViewWillEnter() {
    this.songs = [];
    this.displaySongs()
  }

  goAdd() {
    this.navCtrl.push(AddPage);
  }
  goUsers(name_user:any)
  {
    this.navCtrl.push(UsersPage,{
      name: name_user
    });
  }

  displaySongs()
  {
    this.http.get('http://localhost:6680/killthedj/tracklist/tracks')
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
