import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Firebase } from '@ionic-native/firebase';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild(Slides) signUpSlides: Slides

  signUpForm1: FormGroup;
  signUpForm2: FormGroup;
  signUpForm3: FormGroup;
  signUpForm4: FormGroup;

  forms: FormGroup[];

  submitText = 'Next';
  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private firebase: Firebase) {
    var config = {
      apiKey: "apiKey",
      authDomain: "bd-tough.firebaseapp.com",
      databaseURL: "https://bd-tough.firebaseio.com/",
      storageBucket: "bd-tough.appspot.com"
    };
    this.firebase.setConfigSettings(config);

    this.signUpForm1 = new FormBuilder().group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(30)])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(30)])],
    });

    this.signUpForm2 = new FormBuilder().group({
      username: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/), Validators.maxLength(150)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\_]*@[a-zA-Z0-9\.\_]*\.[a-zA-Z0-9\.\_]*$/), Validators.maxLength(150)])]
    });

    this.signUpForm3 = new FormBuilder().group({
      password: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      confirmPassword: ['', Validators.compose([Validators.required, (control)=>{
        let form = control.parent;
        if(form && form.value.password != control.value){
          return {
            passwordMismatch: {
              mismatch: 'password mismatch'
            }
          }
        }
        return null;
      }])]
    });

    this.signUpForm4 = new FormBuilder().group({
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(30)])],
      gender: ['M']
    });

    this.forms = [this.signUpForm1, this.signUpForm2, this.signUpForm3, this.signUpForm4];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignupPage');
  }

  ionViewDidEnter(){
    let pageWidth = document.getElementById('logo').clientWidth;
    let forms = document.getElementsByClassName('form-container');
    for(let i = 0; i < forms.length; i++){
      (<HTMLElement>forms[i]).style.width = pageWidth + 'px';
    }

    this.signUpSlides.lockSwipeToNext(true);
  }

  passwordStrength = '';
  strengthColor = '';

  checkPasswordStrength(){
    let strong = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    let medium = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    let password = this.signUpForm3.value.password;
    if(strong.test(password)){
      this.passwordStrength = 'strong';
      this.strengthColor = 'green';
    } else if(medium.test(password)){
      this.passwordStrength = 'medium';
      this.strengthColor = 'yellow';
    } else{
      this.passwordStrength = 'weak';
      this.strengthColor = 'red';
    }
  }

  slideChanged(){
    let cSlide = this.signUpSlides.getActiveIndex();
    this.submitText = cSlide == 3 || cSlide == 4 ? 'Sign Up' : 'Next';
    this.submitTry = false;
  }

  next(){
    this.submitTry = true;
    let currentForm = this.forms[this.signUpSlides.getActiveIndex()];

    if(currentForm.valid){
      this.submitTry = false;
      if(this.submitText == 'Sign Up'){
        this.signUp();
      } else{
        this.signUpSlides.lockSwipeToNext(false);
        this.signUpSlides.slideNext(500);
        this.signUpSlides.lockSwipeToNext(true);
      }
    } else{
      // console.log(currentForm.value);
    }
  }

  back(){
    this.signUpSlides.slidePrev(500);
  }

  
  signUp(){
    // console.log(this.signUpForm1.value, this.signUpForm2.value, this.signUpForm3.value, this.signUpForm4.value);
    let loading = this.loadingCtrl.create({
      content: 'Creating witness account',
      enableBackdropDismiss: true
    });
    loading.present();
  }

}
