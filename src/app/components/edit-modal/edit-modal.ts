import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-edit-modal',
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
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css'
})
export class EditModalComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {
    this.editForm = this.fb.group({
      title: [data.title, [Validators.required, Validators.minLength(1)]],
      description: [data.description, [Validators.required, Validators.minLength(1)]]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedCard: Card = {
        ...this.data,
        title: this.editForm.get('title')?.value.trim(),
        description: this.editForm.get('description')?.value.trim()
      };
      this.dialogRef.close(updatedCard);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}