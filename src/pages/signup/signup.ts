import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Firebase } from '@ionic-native/firebase';

import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';

@DisableSideMenu()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;

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

    this.signUpForm = new FormBuilder().group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50)])],
      sport: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50)])],
      level: ['P'],
      school: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\_]*@[a-zA-Z0-9\.\_]*\.[a-zA-Z0-9\.\_]*$/), Validators.maxLength(150)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
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
      }])],
      // phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(30)])],
      gender: ['M']
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignupPage');
  }

  ionViewDidEnter(){
    // let pageWidth = document.getElementById('logo').clientWidth;
    // let forms = document.getElementsByClassName('form-container');
    // for(let i = 0; i < forms.length; i++){
    //   (<HTMLElement>forms[i]).style.width = pageWidth + 'px';
    // }
  }

  passwordStrength = '';
  strengthColor = '';

  checkPasswordStrength(){
    let strong = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    let medium = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    let password = this.signUpForm.value.password;
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
  
  signUp(){
    this.submitTry = true;
    if(this.signUpForm.valid){
      let loading = this.loadingCtrl.create({
        content: 'Creating account',
        enableBackdropDismiss: true
      });
      loading.present();

      setTimeout(()=>{
        loading.dismiss();
        this.navCtrl.push(HomePage);
      }, 3000);
    }
  }

  signIn(){
    this.navCtrl.push(SigninPage);
  }

}
