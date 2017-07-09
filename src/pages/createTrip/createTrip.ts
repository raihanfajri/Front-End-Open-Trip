import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
//import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
//import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-createTrip',
  templateUrl: 'createTrip.html'
})
export class createTripPage {
  public tripname: string;
  public idadmin = 0;
  public asal: string;
  public tujuan: string;
  public tanggal: string;
  public detail: string;
  public budget = null;
  public kapasitas = null;
  public sisa = null;
  public input: any;
  public noInput = false;
  public foto: string;
  constructor(private camera: Camera, public http: Http, public navCtrl: NavController,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    this.foto = '../assets/img/no-image-icon-11.PNG';
    let user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    this.idadmin = user[0]["idUser"];
  }
  //fileTransfer: TransferObject = this.transfer.create();
  openGallery(){
    this.camera.getPicture({
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 1000,
    targetHeight: 1000
  }).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
   let base64Image = 'data:image/jpeg;base64,' + imageData;
   this.foto = base64Image;
  }, (err) => {
   console.log(err);
   alert('Tidak bisa ambil gambar');
  });
  }
  kirim(){
    if(this.asal == undefined || this.tujuan == undefined || this.tanggal == undefined  ||this.detail == undefined|| !this.detail || !this.tujuan || !this.tanggal || !this.asal){
      this.noInput = true;
    }else{
      let loading = this.loadingCtrl.create({
        content: `<ion-spinner name="bubbles">Loading, Please wait..</ion-spinner>`
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.input = {tripname : this.tripname, idadmin : this.idadmin, asal : this.asal, tujuan: this.tujuan, tanggal : this.tanggal,kapasitas: this.kapasitas,sisa:this.sisa, budget:this.budget, detail: this.detail, foto: this.foto};
      console.log(this.input);
      this.http.post("http://localhost:3000/trip/createtrip", JSON.stringify(this.input), {headers: headers}).subscribe(data => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Your Trip Request Has Been Sent',
              subTitle: 'Please Wait for the Confirmation by Our Administrator',
              buttons: ['Dismiss']
            });
            alert.present();
            this.navCtrl.pop();
      },
        err => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Connection Error!',
            subTitle: 'Please Check Your Connection',
            buttons: ['Dismiss']
          });
          alert.present();
        });
    }
  }
}
