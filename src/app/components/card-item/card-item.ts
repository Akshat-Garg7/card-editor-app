import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css'
})
export class CardItemComponent {
  @Input() card!: Card;
  @Output() edit = new EventEmitter<Card>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.card);
  }

  onDelete(): void {
    this.delete.emit(this.card.id);
  }
}