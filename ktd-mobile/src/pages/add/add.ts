import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//HTTP PART
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  link : string;
  data : any;
  test : any;

  constructor(public navCtrl: NavController,  public http: Http) {
  }

  search(ev: any) {
    this.answer = null;
    // set val to the value of the searchbar
    let val = ev.target.value;

    if (val && val.trim() != '')
    {
      this.link = 'http://localhost:6680/killthedj/searches';
      //this.data = JSON.stringify({username: this.data.username});
      this.data = JSON.stringify({
        "query": {
          "track_name": [
            val
          ]
        }
      });

      this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
        this.answer = data[0].tracks;
      }, error => {
        console.log("Search failed");
      });
    }
  }

  submit(name:any, uri:any)
  {
    this.test = uri;

    this.link = 'http://localhost:6680/killthedj/tracklist/tracks';

    this.data = JSON.stringify(
      {
        "uri": uri
      });

    this.http.post(this.link, this.data).map(res => res.json()).subscribe(data => {
      console.log(data);
    }, error => {
      console.log("Submit song failed");
    });
  }

}
