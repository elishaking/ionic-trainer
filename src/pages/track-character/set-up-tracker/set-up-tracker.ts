import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-set-up-tracker',
  templateUrl: 'set-up-tracker.html',
})
export class SetUpTrackerPage {
  trakingDuration = 'daily';
  timeInterval = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNotifications: LocalNotifications) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SetUpTrackerPage');
  }

  setTimeInterval(){
    // if(this.trakingDuration == 'daily'){
    //   this.timeInterval = 3600 * 1e+3;
    // } else if(this.trakingDuration == 'monthly'){
    //   this.timeInterval = 111600 * 1e+3;
    // } else{
    //   this.timeInterval = 1314000 * 1e+3;
    // }
    this.timeInterval = 3000;
  }

  scheduleNotification(){
    this.setTimeInterval();
    this.localNotifications.schedule({
      title: 'BdTough',
      text: 'Check back',
      at: new Date((new Date()).getTime() + this.timeInterval),
      icon: 'img/logo.png'
    })
  }

}
