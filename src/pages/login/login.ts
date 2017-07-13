import { Component,ElementRef } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Facebook } from '@ionic-native/facebook'
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { Http,Headers } from '@angular/http';
import { DataService } from '../tabs/tabs';
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
  	this.af.auth.login({
  		provider: AuthProviders.Facebook,
  		method: AuthMethods.Popup
  	}).then(function(response){
      console.log("login dapet")
  		let reg = {
        name: response.auth.displayName,
  			email:response.auth.email,
  			picture:response.auth.photoURL
  		};
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      self.http.post(self.dataService.getHost()+"/users/login", reg, {headers: headers}).subscribe(data => {
         let v = data.json();
         try{
            JSON.stringify(v);
            console.log("aman")
          }
          catch(err){
            console.log("vnya circular")
            console.log(err)                
          }
         window.localStorage.setItem('user',JSON.stringify(v));
         console.log("user data changed ");
      },err =>{
        console.log("erorr kirim")
        console.log(err);
      });
      window.localStorage.setItem('user',JSON.stringify(reg));
      self.navCtrl.setRoot(TabsPage);
      loading.dismiss()
      //app.setRootpage(TabsPage);
  	}).catch(function(error){
      loading.dismiss()
      console.log("error auth facebook")
  		console.log(error);
  	});
  }
}
