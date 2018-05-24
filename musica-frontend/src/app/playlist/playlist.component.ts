import { PlaylistResponse } from './../models/playlistResponse.model';
import { Playlist } from './../models/playlist.model';
import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { Musica } from '../models/musica.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() playlist: PlaylistResponse;

  ngOnInit() {
    // console.log(this.playlist)
  }

  ngOnChanges() {
    console.log('mudou');
  }

  checkedMusic(musica: Musica) {
    this.playlist.playlistMusicas.forEach(element => {
      element.musica.checked = false;
    });
    musica.checked = !musica.checked;
  }
}
