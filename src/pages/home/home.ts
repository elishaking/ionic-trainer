import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Activity } from '../../models/interfaces';
import { Storage } from '@ionic/storage';
// import { ThenableReference } from '@firebase/database-types';
import { Reference } from '@firebase/database';
import { ContactUsPage } from '../contact-us/contact-us';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  activities: Activity[] = [];
  userRef: Reference;

  constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage) {
    this.userRef = this.navParams.get('userRef') || this.userRef;
  }

  ionViewDidLoad(){
    console.log(this.userRef);
    this.storage.get('activities').then((activities) => {
      this.activities = activities ? activities : [];
    });
  }

  contact(){
    this.navCtrl.push(ContactUsPage);
  }

}
