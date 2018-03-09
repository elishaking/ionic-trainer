import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Activity, Identity, Faith } from '../../models/interfaces';
import { Storage } from '@ionic/storage';
// import { ThenableReference } from '@firebase/database-types';
import { Reference } from '@firebase/database';
import { ContactUsPage } from '../contact-us/contact-us';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  identity: Identity;
  faith: Faith;

  activities: Activity[] = [];
  userRef: Reference;

  checked: boolean[] = [];
  showDeleteBtn = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage,
    private emailComposer: EmailComposer) {
    this.userRef = this.navParams.get('userRef') || this.userRef;

    this.storage.get('identity').then((identity) => {
      this.identity = identity;
    });
    this.storage.get('faith').then((faith) => {
      this.faith = faith;
    });
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
    // this.navCtrl.push(ContactUsPage);
    let email = {
      to: 'darreljordan1980@gmail.com',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      // subject: 'BdTough: Message from ' + msg.name + ': ' + msg.email,
      // body: '',
      // isHtml: true
    };
    
    this.emailComposer.open(email);
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
