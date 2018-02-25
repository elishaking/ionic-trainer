import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetUpTrackerPage } from './set-up-tracker/set-up-tracker';

@Component({
  selector: 'page-track-character',
  templateUrl: 'track-character.html',
})
export class TrackCharacterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  setUpTracker(){
    this.navCtrl.push(SetUpTrackerPage);
  }

  enterGrade(){

  }

  viewResponse(){

  }

}
