import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalVariables } from '../../services/global_variables';

/*
  Generated class for the Add page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  answer: any;
  blank: any;
  link : string;
  data : any;
  test : any;
  songs: Array<{title: string, artist: string, length: number, votes:number, uri:string}>;


  constructor(public navCtrl: NavController,  public http: Http, public globalVariables: GlobalVariables) {
    this.blank = null;
    this.songs = [];
  }

  search(ev: any) {
    this.answer = null;
    this.songs = [];

    // set val to the value of the searchbar
    let val = ev.target.value;

    if (val && val.trim() != '')
    {
      this.link = this.globalVariables.backendUrl+'/killthedj/searches';
      //this.data = JSON.stringify({username: this.data.username});
      this.data = JSON.stringify({
        "query": {
          "track_name": [
            val
          ]
        }
      });

      //this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      //  this.answer = data[0].tracks;
      //  console.log(this.answer[0].artists[0].name);
      //}, error => {
      //  console.log("Search failed");
      //});

      this.http.post(this.link, this.data)
        .map(res => {
          return res.json().map((item) => {
            //console.log(item.track[0].name);
            //console.log(item.track[0].artists[0].name);
            //console.log(item);
            for (let entry of item.tracks) {
              this.songs.push(
                {
                  title: entry.name,
                  artist: entry.artists[0].name,
                  length: entry.length,
                  votes: entry.votes,
                  uri: entry.uri,
                });
            }


            return item;
          })
        })
        .subscribe(data => {
          //console.log(data);
        });

    }
  }

  submit(uri:any)
  {
    this.test = uri;
    this.link = 'http://localhost:6680/killthedj/tracklist/tracks';
    this.data = JSON.stringify(
      {
        "uri": uri
      });

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      //console.log(data);
    }, error => {
      console.log("Submit song failed");
    });

  }

}
