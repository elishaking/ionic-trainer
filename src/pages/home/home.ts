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

  checked: boolean[] = [];
  showDeleteBtn = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage) {
    this.userRef = this.navParams.get('userRef') || this.userRef;
  }

  ionViewDidLoad(){
    console.log(this.userRef);
    this.storage.get('activities').then((activities) => {
      this.activities = activities ? activities : [];
      this.updateChecked();
    });
  }

  updateChecked(){
    for(let i = 0; i < this.activities.length; i++){
      this.checked.push(false);
    }
  }

  contact(){
    this.navCtrl.push(ContactUsPage);
  }

  toggleDeleteFab(){
    this.showDeleteBtn = this.checked.indexOf(true) != -1;
  }

  delete(){
    for(let i = 0; i < this.activities.length; i++){
      if(this.checked[i]){
        this.checked.splice(i, 1);
        this.activities.splice(i, 1);
        i--;
      }
    }
    this.showDeleteBtn = false;
    this.storage.set('activities', this.activities);
  }

}
