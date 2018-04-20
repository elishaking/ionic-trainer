import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, Platform } from 'ionic-angular';

import { RecordTalkPage } from './record-talk/record-talk';
import { Talk, Activity } from '../../models/interfaces';
import { Storage } from '@ionic/storage';

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { getDayTime } from '../../models/functions';
import { PepTalkDetailsPage } from './pep-talk-details/pep-talk-details';
import { MediaObject, Media } from '@ionic-native/media';

@Component({
  selector: 'page-produce-pep-talks',
  templateUrl: 'produce-pep-talks.html',
})
export class ProducePepTalksPage {
  talks: Talk[] = [];
  nTalks = 0;

  checked: boolean[] = [];
  showDeleteBtn = false;

  sounds = [];

  mediaObject: MediaObject;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private storage: Storage,
    private mediaCapture: MediaCapture, private modalCtrl: ModalController,
    private platform: Platform,
    private media: Media) {
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
        this.updateChecked();
      }
    });
  }

  ionViewDidEnter(){
    let videos = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('video-talk');
    for(let i = 0; i < videos.length; i++){
      videos[i].style.height = videos[i].clientWidth + 'px';
    }

    // let url = '/Users/king/Library/Developer/CoreSimulator/Devices/CB01E1E4-7276-40A8-B53F-AC4C94B42660/data/Containers/Data/Application/B0926D78-A5EE-4B36-BB12-902453F5BE63/tmp/audio_001.wav';
    if (this.mediaObject) {
      this.mediaObject.release();
    }      
    this.mediaObject = this.media.create(this.talks[0].name);
    // this.mediaObject.onError.subscribe((error) => {
    //   console.error(JSON.stringify(error));
    // });
    // this.mediaObject.onSuccess.subscribe((suc) => {
    //   console.info(suc);
    // })
    
    
    setTimeout(()=>{
      this.mediaObject.play();
    }, 3000);
  }

  ionViewDidLeave() {
    if (this.mediaObject) {
      this.mediaObject.release();
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
        if(this.platform.is('ios')){
          
          this.mediaCapture.captureAudio({limit: 1}).then((mediaFile: MediaFile[]) => {
            console.log(mediaFile[0].fullPath);
            let date = getDayTime();
            let talk: Talk = {
              title: talkDetails.title,
              name: mediaFile[0].fullPath, //'file:///storage/emulated/0/talk_' + (this.nTalks) + '.wav',
              length: mediaFile[0].size.toString(),
              date: date[0] + " " + date[1],
            }

            console.log(talk.name);

            this.talks.unshift(talk);
            this.storage.set('talks', this.talks).then(() => {
              this.storage.get('activities').then((activities: Activity[]) => {
                let a = activities ? activities : [];
                a.unshift({
                  title: 'Recorded new PEP Talk',
                  date: date[0] + " " + date[1]
                });
                this.storage.set('activities', a);
              });
            });
            this.storage.set('nTalks', this.nTalks);
          }, (error) => {
            console.error(error);
          });
        }
        else if(this.platform.is('android')){
          this.navCtrl.push(RecordTalkPage, {
            'talks': this.talks,
            'talkDetails': talkDetails
          });
        }
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
