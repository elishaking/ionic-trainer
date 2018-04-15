import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
import { getDayTime } from '../../../models/functions';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-set-up-tracker',
  templateUrl: 'set-up-tracker.html',
})
export class SetUpTrackerPage {
  trakingDuration = '';
  timeInterval = 0;
  every: ELocalNotificationTriggerUnit;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNotifications: LocalNotifications, private platform: Platform,
    private storage: Storage) {
    this.storage.get('trakingDuration').then((trakingDuration) => {
      this.trakingDuration = trakingDuration ? trakingDuration : '';
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SetUpTrackerPage');
  }

  setTimeInterval(){
    if(this.trakingDuration == 'daily'){
      this.timeInterval = 3600 * 1e+3;
      this.every = ELocalNotificationTriggerUnit.DAY;
    } else if(this.trakingDuration == 'weekly'){
      this.timeInterval = 25200 * 1e+3;
      this.every = ELocalNotificationTriggerUnit.WEEK;
    } else{
      this.timeInterval = 781200 * 1e+3;
      this.every = ELocalNotificationTriggerUnit.MONTH;
    }
    // this.timeInterval = 3000;
  }

  scheduleNotification(){
    this.storage.set('trakingDuration', this.trakingDuration);
    this.setTimeInterval();
    this.localNotifications.clearAll().then(() => {
      this.localNotifications.schedule([
        {
          id: 1,
          title: 'BdTough',
          text: "You'll be reminded to check back " + this.trakingDuration,
          // trigger: {at: new Date((new Date()).getTime() + 1000)},
          vibrate: true,
          led: { color: '#FF00FF', on: 500, off: 500 },
          sound: this.platform.is('android') ? 'file://sound.mp3': 'file://beep.caf',
          icon: 'img/logo.png'
        },
        {
          id: 2,
          title: 'BdTough',
          text: 'Check back',
          trigger: {firstAt: new Date(), every: this.every},
          vibrate: true,
          led: { color: '#FF00FF', on: 500, off: 500 },
          sound: this.platform.is('android') ? 'file://sound.mp3': 'file://beep.caf',
          icon: 'img/logo.png'
        }
      ]);
    });
  }

  close(){
    this.navCtrl.pop();
  }

}
