import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-card-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-card-dialog.html',
  styleUrl: './add-card-dialog.css'
})
export class AddCardDialogComponent {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCardDialogComponent>
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSave(): void {
    if (this.addForm.valid) {
      const newCard = {
        title: this.addForm.get('title')?.value.trim(),
        description: this.addForm.get('description')?.value.trim()
      };
      this.dialogRef.close(newCard);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}