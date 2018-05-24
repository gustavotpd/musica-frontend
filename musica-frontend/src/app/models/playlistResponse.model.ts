import { Playlist } from './playlist.model';
import { Usuario } from './usuario.model';
export class PlaylistResponse {
    public id: string;
    public playlistMusicas: Playlist[];
    public usuario: Usuario;
}

// {
//     "id": "string",
//     "playlistMusicas": [
//       {
//         "musica": {
//           "artista": {
//             "id": "string",
//             "nome": "string"
//           },
//           "artistaId": "string",
//           "id": "string",
//           "nome": "string"
//         },
//         "musicaId": "string",
//         "playlistId": "string"
//       }
//     ],
//     "usuario": {
//       "id": "string",
//       "nome": "string",
//       "playlistId": "string"
//     }
//   }
