import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private gifsService: GifsService
  ) {}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  // Buscar tag al tocar el nombre del historial
  public searchTag( tag: string ): void {
    // console.log({ tag });
    this.gifsService.searchTag( tag );
  }

}
