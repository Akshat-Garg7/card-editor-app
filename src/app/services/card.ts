import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsData: Card[] = [
    {
      id: 1,
      title: "Project Planning",
      description: "Define project scope, objectives, and deliverables for Q1 2024."
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Create wireframes and mockups for the new dashboard interface."
    },
    {
      id: 3,
      title: "Database Schema",
      description: "Design and optimize database structure for better performance."
    },
    {
      id: 4,
      title: "API Development",
      description: "Develop RESTful APIs for user authentication and data management."
    },
    {
      id: 5,
      title: "Testing Strategy",
      description: "Implement unit tests and integration tests for all components."
    },
    {
      id: 6,
      title: "Deployment Process",
      description: "Set up CI/CD pipeline for automated testing and deployment."
    }
  ];

  private cardsSubject = new BehaviorSubject<Card[]>(this.cardsData);
  public cards$ = this.cardsSubject.asObservable();

  getCards(): Observable<Card[]> {
    return this.cards$;
  }

  updateCard(updatedCard: Card): void {
    const index = this.cardsData.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      this.cardsData[index] = { ...updatedCard };
      this.cardsSubject.next([...this.cardsData]);
    }
  }

  addCard(newCard: Omit<Card, 'id'>): void {
    const id = Math.max(...this.cardsData.map(c => c.id), 0) + 1;
    this.cardsData.push({ ...newCard, id });
    this.cardsSubject.next([...this.cardsData]);
  }

  deleteCard(id: number): void {
    this.cardsData = this.cardsData.filter(card => card.id !== id);
    this.cardsSubject.next([...this.cardsData]);
  }
}