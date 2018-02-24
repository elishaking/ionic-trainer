import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Activity } from '../../models/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  activities: Activity[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  ionViewDidLoad(){
    this.storage.get('activities').then((activities) => {
      this.activities = activities ? activities : [];
    });
  }

}
