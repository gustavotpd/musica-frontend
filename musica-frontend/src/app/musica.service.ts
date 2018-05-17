

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Musica } from './models/musica.model';
import { PlaylistResponse } from './models/playlistResponse.model';

const API_URL = "https://intense-ocean-93206.herokuapp.com";

@Injectable()
export class MusicaService {

  constructor(private http: Http) {
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  // API: GET /Prato
  public getMusicas(musica): Observable<Musica[]>  {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    const options = new RequestOptions({ headers: headers });

    // will use this.http.get()
    return this.http
    .get(API_URL + '/api/musicas/?filtro=' + musica)
    .map(response => {      
      return response.json();
    })
    .catch(this.handleError);
  }

  public getPlaylist(usuario): Observable<PlaylistResponse>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    const options = new RequestOptions({ headers: headers });

    // will use this.http.get()
    return this.http
    .get(API_URL + '/api/playlists/?user=' + usuario)
    .map(response => {      
      return response.json();
    })
    .catch(this.handleError);
  }

  public incluirMusicaPlaylist(playlistId, musica){
    let body = JSON.stringify(musica)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    const options = new RequestOptions({ headers: headers });

    return this.http
    .put(API_URL + '/api/playlists/'+playlistId+'/musicas', body, options)
    .map(response => {      
      return response.status;
    })
    .catch(this.handleError);
  }

  public removerMusicaPlaylist(playlistId, musica){    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    const options = new RequestOptions({ headers: headers });

    return this.http
    .delete(API_URL + '/api/playlists/'+playlistId+'/musicas/'+ musica.id, options)
    .map(response => {      
      return response.status;
    })
    .catch(this.handleError);

  }


}
