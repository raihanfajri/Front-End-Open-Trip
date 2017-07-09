import { Component,ElementRef,OnInit  } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook'
// import { NativeStorage } from '@ionic-native/native-storage'
import { TabsPage } from '../tabs/tabs'
import { AuthProviders, AuthMethods, AngularFire, FirebaseListObservable } from 'angularfire2';
import { MyApp } from '../../app/app.component'
import { Http,Headers } from '@angular/http';
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
  root:any;
  constructor(public navCtrl: NavController,public af: AngularFire, public element: ElementRef,public http: Http) {
    this.element.nativeElement;
  }
  ngOnInit(){
    this.root = this.element.nativeElement;
  	var fbBtn =  this.root.querySelector('#fb-login');
  	fbBtn.addEventListener('click',this.onFacebookLogin.bind(this));
  }
  onFacebookLogin(e){
  	let self = this;
  	this.af.auth.login({
  		provider: AuthProviders.Facebook,
  		method: AuthMethods.Popup
  	}).then(function(response){
  		let user = {
        name: response.auth.displayName,
  			email:response.auth.email,
  			picture:response.auth.photoURL
  		};
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      self.http.post("http://localhost:3000/users/login", user, {headers: headers}).subscribe(data => {
         let v = data.json();
         window.localStorage.setItem('user',JSON.stringify(v));
         console.log("user data changed ");
      });
      self.navCtrl.setRoot(TabsPage);
      //app.setRootpage(TabsPage);
  	}).catch(function(error){
  		console.log(error);
  	});
  }
}
