import { Component } from '@angular/core';
import { Prenotazione } from './prenotazione.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PreVerifica';
  data: Object;
  obs: Observable<Object>;
  obsPreno: Observable<Prenotazione[]>;
  prenoData: Prenotazione[];
  constructor(public http: HttpClient) { this.makeTypedRequest(); }
  makeTypedRequest(): void {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
    this.obsPreno = this.http.get<Prenotazione[]>(' https://my-json-server.typicode.com/KevinSolimo/JSONServer/Prenotazioni');
    this.obsPreno.subscribe(data => { this.prenoData = data;  });
  }

  onAddPreno(nome: HTMLInputElement, cognome: HTMLInputElement, indirizzo: HTMLInputElement, telefono: HTMLInputElement, email: HTMLInputElement, data: HTMLInputElement, ora: HTMLInputElement) : boolean
  {
    let prenoto: Prenotazione = new Prenotazione();
    prenoto.nome = nome.value;
    prenoto.cognome = cognome.value;
    prenoto.indirizzo = indirizzo.value;
    prenoto.data = new Date(data.value);
    prenoto.ora = ora.value;
    this.prenoData.push(prenoto);
    this.makeCompactPost(prenoto);
    return false;
  }
   makeCompactPost(prenoto:Prenotazione): void {
   this.http.post('https://my-json-server.typicode.com/KevinSolimo/JSONServer/Prenotazioni',JSON.stringify(prenoto))
     .subscribe(data => {
       this.data = data;
     });
 }
}
