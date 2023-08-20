import { Injectable } from '@angular/core';

/*
  provideIn: 'root' lo que hace es permitir que nuestro servicio este de manera
  global en nuestra aplicación, si no se coloca como provideIn: 'root' hay declararlo
  en el apartado "providers" del módulo donde se quiera usar, pero si en nuestra app
  muchos módulos lo necesitan es mejor volverlo global con el provideIn: 'root'
*/
@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  // Obtener tags
  get tagsHisory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);

  }

  // Agregar tag
  public searchTag( tag: string ): void {

    // Si el texto viene vacío
    if( tag.length === 0 ) return;

    // Agregar tag al principio de la lista
    // this._tagsHistory.unshift(tag);

    this.organizeHistory( tag );

    console.log(this._tagsHistory);
  }

}
