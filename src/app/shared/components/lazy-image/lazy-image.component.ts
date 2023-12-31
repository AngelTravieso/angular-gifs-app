import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  // Propiedad para saber si cargó la imágen
  public hasLoaded: boolean = false;

  ngOnInit(): void {
    // Disparar error si no se pasa como prop la url
    if( !this.url ) throw new Error('URL property is required');
  }

  onLoad() {
    // console.log('Image loaded');

    // Esperar 1seg para que se muestre la img
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);

  }

}
