import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';

@Component({
  selector: 'page-createTrip',
  templateUrl: 'createTrip.html'
})
export class createTripPage {
  public tripname: string;
  public idadmin = 1;
  public asal: string;
  public tujuan: string;
  public tanggal: string;
  public detail: string;
  public input: string;
  public noInput = false;
  constructor(public http: Http, public navCtrl: NavController) {

  }
  kirim(){
    if(this.asal == undefined || this.tujuan == undefined || this.tanggal == undefined  ||this.detail == undefined|| !this.detail || !this.tujuan || !this.tanggal || !this.asal){
      this.noInput = true;
    }else{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.input = JSON.stringify({tripname : this.tripname, idadmin : this.idadmin, asal : this.asal, tujuan: this.tujuan, tanggal : this.tanggal, detail: this.detail});
      console.log(this.input);
      this.http.post("http://localhost:3000/trip", this.input, {headers: headers}).subscribe(data => {
            let v = data.json();
        });
      this.navCtrl.pop();
    }
  }
}
