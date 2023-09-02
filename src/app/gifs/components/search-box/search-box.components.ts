import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

// #txtTagInput => Referencia local del input, es como un nombre
// (keyup.enter) => Evento al presionar la tecla Enter
@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `

  // (keyup.enter)="searchTag( txtTagInput.value )"
})

export class SearchBoxComponent{

  // @ViewChild('referencia_local')
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>; // Es de tipo HTMLInputElement

  // Inyectar servicio
  constructor(
    private gifsService: GifsService
  ) { }

  // Sin ViewChild
  // searchTag( newTag: string ) {
  //   console.log({newTag});
  // }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    // console.log({newTag});
    this.gifsService.searchTag( newTag );

    // Limpiar la caja de texto
    this.tagInput.nativeElement.value = '';

  }

}
