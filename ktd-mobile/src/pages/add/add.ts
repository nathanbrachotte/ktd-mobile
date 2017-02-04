import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//HTTP PART
import { Http, Headers } from '@angular/http';
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
  data: any;
  songs: Array<{title: string, artist: string, length: number, uri:string, present: boolean}>;
  headers:any;


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

      //this.data = JSON.stringify({username: this.data.username});
      this.data = JSON.stringify({
        "query": {
          "track_name": [
            val
          ]
        }
      });


      //{
      //  headers: this.headers
      //}

      this.http.post(this.globalVariables.backendUrl+'/killthedj/searches', this.data)
        .map(res => {
        return res.json().map((item) => {
          //console.log(item.track[0].name);
          //console.log(item.track[0].artists[0].name);
          console.log(item);
          this.songs.push(
            {
              title: item.name,
              artist: item.artists[0].name,
              length: item.length,
              uri: item.uri,
              present: item.present
            });
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
    this.data = JSON.stringify(
      {
        "uri": uri
      });
    this.http.post(this.globalVariables.backendUrl+'/killthedj/tracklist/tracks', this.data,{headers: this.globalVariables.header}).map(res => res.json()).subscribe(data => {
      //console.log(data);
    }, error => {
      console.log("Submit song failed");
    });

  }

}
