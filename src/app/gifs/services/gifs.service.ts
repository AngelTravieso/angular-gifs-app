import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

/*
  provideIn: 'root' lo que hace es permitir que nuestro servicio este de manera
  global en nuestra aplicación, si no se coloca como provideIn: 'root' hay declararlo
  en el apartado "providers" del módulo donde se quiera usar, pero si en nuestra app
  muchos módulos lo necesitan es mejor volverlo global con el provideIn: 'root'
*/
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'D6kya1IWLx0W1WgHPFKGVWwHEAoTu65k';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor(
    // Inyectar servicio http
    private http: HttpClient ) {
    // Cuando el gifService sea cargado cargar la data que este en LS
    this.loadLocalStorage();
  }

  // Obtener tags
  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    // Después de modificar el historial lo guardo en el LocalStorage
    this.saveLocalStorage();

  }

  // Guardar los gifs en el localStorage
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  // Cargar del LocalStorage
  private loadLocalStorage(): void {
    // Si no hay data del historial de gifs en el LocalStorage
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! ); // Siempre va a venir una data si hay algo en el LS

    if(this.tagsHistory.length === 0) return;

    // Por default cargar el 1er valor encontrado en el LS
    this.searchTag( this._tagsHistory[0]);

  }

  // Agregar tag
  searchTag( tag: string ): void {

    // Si el texto viene vacío
    if( tag.length === 0 ) return;

    // Agregar tag al principio de la lista
    // this._tagsHistory.unshift(tag);

    this.organizeHistory( tag );
    // console.log(this._tagsHistory);

    // Objeto de parámetros
    const params = new HttpParams()
      .set('api_key', 'D6kya1IWLx0W1WgHPFKGVWwHEAoTu65k')
      .set('limit', 10)
      .set('q', tag)

      // La petición será de tipo de la interfaz SearchResponse
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifsList = resp.data;
        // console.log({gifs: this.gifsList});

      });

  }

}
