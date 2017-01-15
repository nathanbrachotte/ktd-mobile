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

  icons: string[];
  songs: Array<{title: any, artist: any, length: any}>;
  items: Array<{title: string, note: string, icon: string}>;
  answer: any;
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

  ionViewWillEnter() { // THERE IT IS!!!
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
          //console.log(item.track[0].length);
          this.songs.push(
            {
              title: item.track[0].name,
              artist: item.track[0].artists[0].name,
              length: item.track[0].length
            });
          return item;
        })
      })
      .subscribe(data => {
        //console.log(data);
      });


    //this.http.get('http://localhost:6680/killthedj/tracklist/tracks').map(res => res.json()).subscribe(data => {
    //  this.songsSelected = data;
    //  console.log(this.songsSelected);
    //});

  }


  upvote() {

    this.link = 'http://localhost:6680/killthedj/searches';
    //this.data = JSON.stringify({username: this.data.username});
    this.data = JSON.stringify({
      "query": {
        "track_name": [
          "Un"
        ]
      }
    });

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      this.answer = data[0].tracks;
    }, error => {
      console.log("Oooops!");
    });
  }

}
