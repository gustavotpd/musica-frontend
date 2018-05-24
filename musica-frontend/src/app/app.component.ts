import { Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import { Usuario } from './models/usuario.model';
import { MusicaService } from './musica.service';
import { Musica } from './models/musica.model';
import { Playlist } from './models/playlist.model';
import { PlaylistResponse } from './models/playlistResponse.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public musicasLista: Musica[];
  public playlist: PlaylistResponse;


  constructor(private musicaService: MusicaService) { }

ngOnInit() {
    this.playlist = new PlaylistResponse()
    // console.log(this.playlist);
}

  public buscarMusica(event) {
      if (event.keyCode === 13) {

          const filter = event.target.value;

          this.musicaService.getMusicas(filter).subscribe((musicas) => {
            this.musicasLista = musicas;
            console.log(musicas);
          }
        );
      }
  }

  public buscarPlaylist(event) {
      if (event.keyCode === 13) {

          const filter = event.target.value;

          this.musicaService.getPlaylist(filter).subscribe((playlist) => {
            this.playlist = playlist;
            // console.log(playlist);
          }
        );
      }
  }

  public incluirMusicasPlaylist() {

    // console.log("PlaylistId: ", this.playlist.id)
    // console.log("Musicas Playlist: ", this.playlist.playlistMusicas)
    // console.log(this.musicasLista);
    // console.log(this.getChecked())
    // console.log(this.musicasLista);
    this.getChecked(this.musicasLista).forEach(element => {
        console.log(element.id);

        const test = _.find(this.playlist.playlistMusicas, (el) => el.musicaId === element.id);
        console.log(test);

        if (test === undefined) {

          console.log('entrou');

          this.musicaService.incluirMusicaPlaylist( this.playlist.id, element)
          .subscribe( (response) => {
            const playList = new Playlist();

            if (response === 200) {
                console.log('foi');
                playList.musica = element;
                playList.musicaId = element.id;
                playList.playlistId = this.playlist.id;
                // console.log(playList)
                this.playlist.playlistMusicas.push(playList);

                this.playlist.playlistMusicas.forEach(el => {
                  el.musica.checked = false;
                });
                // console.log(this.playlist)
            }
          });
        }
    });
  }

  public removerMusicasPlaylist() {

    console.log(this.playlist.playlistMusicas);
      _.filter(this.playlist.playlistMusicas, (item) => item.musica.checked === true)
          .forEach(element => {
           console.log(element.musica.nome);
            console.log(element.musica.id);
            console.log(element.musicaId);
            this.musicaService.removerMusicaPlaylist( this.playlist.id, element.musica)
            .subscribe( (response) => {
              const playList = new Playlist();
              if (response === 200) {
                  console.log('foi');
                  playList.musica = element.musica;
                  playList.musicaId = element.musica.id;
                  playList.playlistId = this.playlist.id;

                  console.log('antes', this.playlist);

                  _.remove(this.playlist.playlistMusicas, (pl) => pl.musicaId === element.musica.id);
                  console.log('depois', this.playlist);
              }
          });
        });
  }

  public getChecked(lista: Musica[]): any {
    let checkedMusics: any;

    checkedMusics = _.filter(lista, (musica) => {
      return musica.checked === true; }
    );

    return checkedMusics;
  }
}




