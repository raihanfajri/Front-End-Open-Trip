import { Component,ElementRef } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Facebook } from '@ionic-native/facebook'
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { Http,Headers } from '@angular/http';
import { DataService } from '../tabs/tabs';
import * as firebase from 'firebase';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // root:any;
  public dataService : any = new DataService;
  constructor(public navCtrl: NavController,public af: AngularFire, public element: ElementRef,public http: Http, public loadingCtrl : LoadingController, public fb:Facebook) {
    // this.element.nativeElement;
  }
  ionViewDidEnter(){
    // this.root = this.element.nativeElement;
  }
  onFacebookLogin(){
  	let self = this;
    let loading = this.loadingCtrl.create({
      content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
    });
    loading.present();
    this.fb.login(['email'])
        .then((_response) => {
          console.log(_response) 
          let creds = firebase.auth.FacebookAuthProvider.credential(_response.authResponse.accessToken)
          let providerConfig = {
            provider: AuthProviders.Facebook,
            method: AuthMethods.OAuthToken
          };
          this.af.auth.login(creds,providerConfig)
            .then((res) => {
              console.log("Firebase success: " + JSON.stringify(res));
              let reg = {
                name: res.auth.displayName,
  	 		        email:res.auth.email,
  	 		        picture:res.auth.photoURL
  	          };
              var headers = new Headers();
              headers.append('Content-Type', 'application/json');
              self.http.post(self.dataService.getHost()+"/users/login", reg, {headers: headers})
              .subscribe(data => {
                if(data.text()){
                  let v = data.json();
                  window.localStorage.setItem('user',JSON.stringify(v));
                  self.navCtrl.setRoot(TabsPage);
                }
                loading.dismiss()
                console.log("user data changed ");
              },err =>{
                loading.dismiss()
                console.log("erorr kirim")
                console.log(err);
              });
            })
            .catch((error) => {
              loading.dismiss()
              console.log("Firebase failure: " + JSON.stringify(error));
            });
        })
        .catch((_error) => { 
          loading.dismiss()
          console.log(_error) 
          console.log("error auth facebook")
        })
  }
}
