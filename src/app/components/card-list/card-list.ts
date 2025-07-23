import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Card } from '../../interfaces/card';
import { CardService } from '../../services/card';
import { CardItemComponent } from '../card-item/card-item';
import { EditModalComponent } from '../edit-modal/edit-modal';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog';
import { take } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    CardItemComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css'
})
export class CardListComponent implements OnInit {
  cards$!: Observable<Card[]>;
  currentCards: Card[] = [];

  constructor(
    private cardService: CardService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cards$ = this.cardService.getCards();
    this.cards$.subscribe(cards => {
      this.currentCards = cards;
    });
  }

  onEditCard(card: Card): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '600px',
      data: card
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.updateCard(result);
      }
    });
  }

 onDeleteCard(id: number): void {
  let cardToDelete: Card | undefined;
  
  this.cards$.pipe(take(1)).subscribe(cards => {
    cardToDelete = cards.find(c => c.id === id);
  });

  if (cardToDelete) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: cardToDelete
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cardService.deleteCard(id);
      }
    });
  }
}

  onAddCard(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.addCard(result);
      }
    });
  }
}