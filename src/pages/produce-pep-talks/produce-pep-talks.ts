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

  playing = []; //false;
  stopped = []; //true;
  playObj: MediaObject[] = [];
  playingPos = 0;

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
      if(talks){
        this.talks = talks;
        this.updateArrays();
      }
    });
  }

  ionViewDidEnter(){
    let videos = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('video-talk');
    for(let i = 0; i < videos.length; i++){
      videos[i].style.height = videos[i].clientWidth + 'px';
    }
  }

  updateArrays(){
    for(let i = 0; i < this.talks.length; i++){
      this.playing.push(false);
      this.stopped.push(true);
      this.playObj.push(null);
    }
  }

  stopAllPlaybacks(){
    for(let i = 0; i < this.talks.length; i++){
      if(this.playObj[i])
        this.stopPlay(i);
      else{
        this.playing[i] = false;
        this.stopped[i] = true;
      }
    }
  }

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

  recordPEPTalk(){
    this.stopAllPlaybacks();
    this.navCtrl.push(RecordTalkPage, {
      'talks': this.talks,
      'playing': this.playing,
      'stopped': this.stopped,
      'playObj': this.playObj
    });
  }

  togglePlay(pos: number){
    if(this.playing[pos]){
      this.playObj[pos].pause();
      this.playing[pos] = false;
    } else{
      if(this.stopped[pos]){
        this.playObj[pos] = this.media.create('talk_' + pos + '.3gp');
        this.stopped[pos] = false;
      }

      this.playObj[pos].play();
      this.playing[pos] = true;
    }
  }

  stopPlay(pos: number){
    this.playing[pos] = false;
    this.stopped[pos] = true;
    this.playObj[pos].stop();
    this.playObj[pos].release();
  }

}
