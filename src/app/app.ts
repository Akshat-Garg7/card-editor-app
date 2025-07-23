import { Component } from '@angular/core';
import { CardListComponent } from './components/card-list/card-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'card-editor-app';
}