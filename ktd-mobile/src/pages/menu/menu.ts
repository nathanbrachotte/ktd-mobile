import {Component, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';

//TEST GOING TO OTHER PAGE
import {UsersPage} from '../users/users';
import {AddPage} from '../add/add';
//
//HTTP PART
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//


import {GlobalVariables} from '../../services/global_variables';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  songs: Array<{title: string, artist: string, length: number, votes: number, uri: string}>;
  items: Array<{title: string, note: string, icon: string}>;
  votes: number;
  current_song: any;


  constructor(public navCtrl: NavController, public http: Http, public globalVariables: GlobalVariables, private _ngZone: NgZone) {
    //this.upvote();
    console.log(globalVariables.username)
    this.songs = [];
    this.displaySongs();
  }


  update() {
    console.log("coucou")
    //let millisecondsToWait = 50000;
    this._ngZone.runOutsideAngular(() => {
      // reenter the Angular zone and display done
      this._ngZone.run(() => {
        let i = 0;
        do {
          //setTimeout(function() {
          // Whatever you want to do after the wait
          console.log('Outside Done!');
          this.sleep(1);
          //}, millisecondsToWait);
          i++;
        }
        while (i < 5);
      });
    });
  }

  sleep(seconds: any) {
    let e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {
    }
  }

  ionViewWillEnter() {
    this.displaySongs()
  }

  goAdd() {
    this.navCtrl.push(AddPage);
  }

  goUsers() {
    this.navCtrl.push(UsersPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.displaySongs();
      refresher.complete();
    }, 300);
  }

  displaySongs() {
    this.songs = [];
    this.http.get(this.globalVariables.backendUrl + '/killthedj/tracklist/tracks', {headers: this.globalVariables.header})
      .map(res => {
        return res.json().map((item) => {
          //console.log(item.track[0].name);
          //console.log(item.track[0].artists[0].name);
          console.log(item);
          this.songs.push(
            {
              title: item.track.name,
              artist: item.track.artists[0].name,
              length: item.track.length,
              votes: item.votes,
              uri: item.track.uri,
            });
          return item;
        })
      })
      .subscribe(data => {
        console.log(data);
      });

    this.http.get(this.globalVariables.backendUrl + '/killthedj/tracklist/votes', {headers: this.globalVariables.header})
      .map(res => {
        return res.json()})
      .subscribe(data => {
        this.votes = data;
      },  error => {
        console.log("Impossible to get the votes");
      });

    this.http.get(this.globalVariables.backendUrl + '/killthedj/tracklist/playback/', {headers: this.globalVariables.header})
      .map(res => {
        return res.json()})
      .subscribe(data => {
        this.current_song = data;
      },  error => {
        console.log("Impossible to get the votes");
      });

  }



  upvote(uri: any) {
    if(this.votes > 0){
      console.log(uri)
      let link = this.globalVariables.backendUrl + '/killthedj/tracklist/votes';
      let data = JSON.stringify(
        {
          "uri": uri
        });
      this.http.put(link, data, {headers: this.globalVariables.header}).map(res => res.json()).subscribe(data => {
        console.log(data);
        this.displaySongs();
      }, error => {
        console.log("Vote impossible");
      });
    }


  }

}
