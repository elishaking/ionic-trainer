import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { RecordTalkPage } from './record-talk/record-talk';
import { Talk } from '../../models/interfaces';
import { Storage } from '@ionic/storage';

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { getDayTime } from '../../models/functions';

@Component({
  selector: 'page-produce-pep-talks',
  templateUrl: 'produce-pep-talks.html',
})
export class ProducePepTalksPage {
  talks: Talk[] = [];
  nTalks = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private storage: Storage,
    private mediaCapture: MediaCapture) {
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
      }
    });
  }

  ionViewDidEnter(){
    let videos = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('video-talk');
    for(let i = 0; i < videos.length; i++){
      videos[i].style.height = videos[i].clientWidth + 'px';
    }
  }

  /*
  videoPEPTalk(){
    this.stopAllPlaybacks();
    this.mediaCapture.captureVideo({ limit: 1 }).then((video: MediaFile[]) => {
      let date = getDayTime();
      let talk: Talk = {
        title: 'PEP Talk ' + (++this.nTalks),
        name: video[0].fullPath,
        date: date[0] + " " + date[1],
        length: '',
        isVideo: true
      }
      this.talks.unshift(talk);
      this.playing.unshift(false);
      this.stopped.unshift(true);
      this.playObj.unshift(null);
      this.storage.set('talks', this.talks);
    });
  }
  */

  recordPEPTalk(){
    this.navCtrl.push(RecordTalkPage, {
      'talks': this.talks
    });
  }

}
