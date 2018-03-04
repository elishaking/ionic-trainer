import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-set-up-tracker',
  templateUrl: 'set-up-tracker.html',
})
export class SetUpTrackerPage {
  trakingDuration = 'daily';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SetUpTrackerPage');
  }

  scheduleNotification(){

  }

}
