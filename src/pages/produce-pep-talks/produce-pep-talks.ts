import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Media, MediaObject } from '@ionic-native/media';
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

  playing = false;
  stopped = true;
  playObj: MediaObject;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private media: Media, private storage: Storage,
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
      if(talks)
        this.talks = talks;
    });
  }

  ionViewDidEnter(){
    let videos = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('video-talk');
    for(let i = 0; i < videos.length; i++){
      videos[i].style.height = videos[i].clientWidth + 'px';
    }
  }

  videoPEPTalk(){
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
      this.storage.set('talks', this.talks);
    });
  }

  recordPEPTalk(){
    this.navCtrl.push(RecordTalkPage, {
      'talks': this.talks
    });
  }

  togglePlay(){
    if(this.playing){
      this.playObj.pause();
      this.playing = false;
    } else{
      if(this.stopped){
        this.playObj = this.media.create('talk_4.3gp');
        this.stopped = false;
      }

      this.playObj.play();
      this.playing = true;
    }
  }

  stopPlay(){
    this.playing = false;
    this.stopped = true;
    this.playObj.stop();
    this.playObj.release();
  }

}
