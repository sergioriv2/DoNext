import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';
import { ITodoDetail } from '../../interfaces/todo-details.interface';
import { generateRandomNumber } from '../../../../helpers/generate-random-number';

@Component({
    selector: 'todo-form-dialog',
    templateUrl: './todo-form-dialog.component.html',
    styleUrl: './todo-form-dialog.component.css',
})
export class TodoFormDialogComponent implements OnInit {
    form!: FormGroup;
    description: string;
    createdAt: Date;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<TodoFormDialogComponent>,
        private readonly todoService: TodoService,
    ) {
        this.description = '';
        this.createdAt = new Date();
    }

    ngOnInit(): void {
        if (this.data?.dateDetails) {
            this.createdAt = new Date(this.data.dateDetails);
        }

        this.form = this.fb.group({
            description: [
                this.description,
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(1),
                ],
            ],
            createdAt: [this.createdAt],
        });
    }

    async save() {
        if (this.form.valid) {
            const newTodo: ITodoDetail = {
                id: generateRandomNumber(),
                description: this.form.controls['description'].value ?? '',
                isComplete: false,
                isInTrash: false,
                createdAt: this.form.controls['createdAt'].value,
            };

            await this.todoService.addTodo(newTodo);

            this.form.reset();
            this.dialogRef.close(this.form.value);
        }
    }

    close() {
        this.dialogRef.close();
    }
}
