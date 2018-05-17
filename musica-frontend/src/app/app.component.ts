
import { Usuario } from './models/usuario.model';
import { MusicaService } from './musica.service';
import { Musica } from './models/musica.model';
import { Component } from '@angular/core';
import { Playlist } from './models/playlist.model';
import { PlaylistResponse } from './models/playlistResponse.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private musicasLista: Musica[]
  private playlist: PlaylistResponse


  constructor(private musicaService: MusicaService) { }

  ngOnInit() {
    console.log(this.musicasLista);
    this.playlist = new PlaylistResponse()
    console.log(this.playlist);
  }
    

  public buscarMusica(event){
    if(event.keyCode == 13){

        let filter = event.target.value;

        this.musicaService.getMusicas(filter).subscribe((musicas) => {
          this.musicasLista = musicas;
          console.log(musicas);
        }
      );
    }
  }

  public buscarPlaylist(event){
    if(event.keyCode == 13){

        let filter = event.target.value;

        this.musicaService.getPlaylist(filter).subscribe((playlist) => {
          this.playlist = playlist;
          //console.log(playlist);
        }
      );
    }
  }

  public incluirMusicasPlaylist(event) {

    //console.log("PlaylistId: ", this.playlist.id)
    //console.log("Musicas Playlist: ", this.playlist.playlistMusicas)
    //console.log(this.musicasLista);
    //console.log(this.getChecked())
    //console.log(this.musicasLista);
    
    this.getChecked(this.musicasLista).forEach(element => {
      console.log(element.id)

      var test = _.find(this.playlist.playlistMusicas, (el) => { return el.musicaId == element.id})

      console.log(test)

      if(test == undefined){

        console.log('entrou')

        this.musicaService.incluirMusicaPlaylist( this.playlist.id, element)
        .subscribe( (response) =>{
          let playList = new Playlist()
          
           if(response==200){
              console.log('foi')
                          
              playList.musica = element
              playList.musicaId = element.id
              playList.playlistId = this.playlist.id
  
              //console.log(playList)
  
              this.playlist.playlistMusicas.push(playList)
              //console.log(this.playlist)
          }
        })
      }
    });
    
  }

  public removerMusicasPlaylist(event) {
    
    console.log(this.playlist.playlistMusicas)

    _.filter(this.playlist.playlistMusicas, (item) => {return item.musica.checked == true}).forEach(element => {
      
        console.log(element.musica.nome)
        console.log(element.musica.id)
        console.log(element.musicaId)
        this.musicaService.removerMusicaPlaylist( this.playlist.id, element.musica)
        .subscribe( (response) =>{
          let playList = new Playlist()
        
          if(response==200){
              console.log('foi')
                          
              playList.musica = element.musica
              playList.musicaId = element.musica.id
              playList.playlistId = this.playlist.id

              console.log("antes", this.playlist)

              _.remove(this.playlist.playlistMusicas, (pl) => { return pl.musicaId == element.musica.id } )              
              console.log("depois", this.playlist)
          }
      })              
    });
   
  }

  public getChecked(lista:Musica[]): any{
    let checkedMusics: any

    checkedMusics = _.filter(lista, (musica) => { 
      return musica.checked == true }
    )

    return checkedMusics
  }
}




