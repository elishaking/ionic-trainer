import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import { RecordTalkPage } from './record-talk/record-talk';
import { Talk } from '../../models/interfaces';
import { Storage } from '@ionic/storage';

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { getDayTime } from '../../models/functions';
import { PepTalkDetailsPage } from './pep-talk-details/pep-talk-details';

@Component({
  selector: 'page-produce-pep-talks',
  templateUrl: 'produce-pep-talks.html',
})
export class ProducePepTalksPage {
  talks: Talk[] = [];
  nTalks = 0;

  checked: boolean[] = [];

  showDeleteBtn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private storage: Storage,
    private mediaCapture: MediaCapture, private modalCtrl: ModalController) {
      // this.talks = [{
      //   title: 'PEP Talk 4',
      //   name: 'talk_4.3gp',
      //   date: 'date',
      //   length: '3'
      // }];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProducePepTalksPage');
    this.storage.get('talks').then((talks: Talk[]) => {
      if(talks){
        this.talks = talks;
        this.updateChecked()
      }
    });
  }

  ionViewDidEnter(){
    let videos = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('video-talk');
    for(let i = 0; i < videos.length; i++){
      videos[i].style.height = videos[i].clientWidth + 'px';
    }
  }

  toggleChecked(){
    this.showDeleteBtn = this.checked.indexOf(true) != -1;
  }

  updateChecked(){
    for(let i = 0; i < this.talks.length; i++){
      this.checked.push(false);
    }
  }

  recordPEPTalk(){
    let talkDetails = {
      title: '',
      description: ''
    }
    let modal = this.modalCtrl.create(PepTalkDetailsPage, {
      'talk': talkDetails
    });
    modal.present();

    modal.onDidDismiss(() => {
      if(talkDetails.title != ''){
        this.navCtrl.push(RecordTalkPage, {
          'talks': this.talks,
          'talkDetails': talkDetails
        });
      }
    });
  }

  delete(){
    for(let i = 0; i < this.talks.length; i++){
      if(this.checked[i] == true){
        this.talks.splice(i, 1);
        this.checked.splice(i, 1);
        i--;
      }
    }
    this.storage.set('talks', this.talks);
    this.showDeleteBtn = false;
  }

}
