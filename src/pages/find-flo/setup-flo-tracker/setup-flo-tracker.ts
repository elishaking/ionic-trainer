import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-setup-flo-tracker',
  templateUrl: 'setup-flo-tracker.html',
})
export class SetupFloTrackerPage {
  trakingDuration = '';
  timeInterval = 0;
  every = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNotifications: LocalNotifications, private platform: Platform,
    private storage: Storage) {
    this.storage.get('trakingDurationFlo').then((trakingDuration) => {
      this.trakingDuration = trakingDuration ? trakingDuration : '';
    })
  }

  ionViewDidLoad() {
  }

  setTimeInterval(){
    if(this.trakingDuration == 'daily'){
      this.timeInterval = 3600 * 1e+3;
      this.every = 'day';
    } else if(this.trakingDuration == 'weekly'){
      this.timeInterval = 25200 * 1e+3;
      this.every = 'week';
    } else{
      this.timeInterval = 781200 * 1e+3;
      this.every = 'month';
    }
    // this.timeInterval = 3000;
  }

  scheduleNotification(){
    this.storage.set('trakingDurationFlo', this.trakingDuration);
    this.setTimeInterval();
    this.localNotifications.clearAll().then(() => {
      this.localNotifications.schedule([
        {
          id: 1,
          title: 'BdTough',
          text: "You'll be reminded to check back " + this.trakingDuration,
          trigger: {at: new Date()},
          // at: new Date((new Date()).getTime() + 1000),
          sound: this.platform.is('android') ? 'file://sound.mp3': 'file://beep.caf',
          icon: 'img/logo.png'
        },
        {
          id: 2,
          title: 'BdTough - Flo',
          text: 'Check back - Flo',
          trigger: {at: new Date((new Date()).getTime() + this.timeInterval)},
          sound: this.platform.is('android') ? 'file://sound.mp3': 'file://beep.caf',
          icon: 'img/logo.png',
        }
      ]);
    });
  }

  close(){
    this.navCtrl.pop();
  }

}
