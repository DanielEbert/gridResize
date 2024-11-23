import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { TileComponent } from './tile/tile.component';

@Component({
  selector: 'app-root',
  imports: [MatGridListModule, CommonModule, TileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tiles = [
    { text: 'Tile 1', colspan: 1, rowspan: 1 },
    { text: 'Tile 2', colspan: 1, rowspan: 1 },
    { text: 'Tile 3', colspan: 1, rowspan: 1 },
  ];

  protected numCols = 3;
  protected rowHeight = 150;

  protected colWidth = 0;
  private resizingTile: any = null;
  private startX: number = 0;
  private startY: number = 0;

  private resizeBound: any;
  private stopResizeBound: any;

  constructor(private el: ElementRef) {}

  startResize(event: MouseEvent, tile: any) {
    event.preventDefault();
    this.resizingTile = tile;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.colWidth = this.el.nativeElement.offsetWidth / this.numCols;

    this.resizeBound = this.resize.bind(this);
    this.stopResizeBound = this.stopResize.bind(this);
    document.addEventListener('mousemove', this.resizeBound);
    document.addEventListener('mouseup', this.stopResizeBound);
  }

  resize(event: MouseEvent) {
    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;

    const colChange = Math.round(deltaX / this.colWidth);
    const rowChange = Math.round(deltaY / this.rowHeight);

    this.startX += colChange * this.colWidth;
    this.startY += rowChange * this.rowHeight;

    this.resizingTile.colspan += colChange;
    this.resizingTile.rowspan += rowChange;
    this.resizingTile.colspan = Math.max(
      1,
      Math.min(this.resizingTile.colspan, this.numCols)
    );
    if (this.resizingTile.rowspan < 1) this.resizingTile.rowspan = 1;
  }

  stopResize() {
    document.removeEventListener('mousemove', this.resizeBound);
    document.removeEventListener('mouseup', this.stopResizeBound);
  }
}
