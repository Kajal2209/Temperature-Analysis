import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent implements OnInit {
  dataForm: FormGroup;
  dataEntries: { temperature: string; datetime: string }[] = []; // Array to store data

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.dataForm = this.fb.group({
      temperature: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Numeric validation
      datetime: ['', Validators.required], // Required validation
    });
  }

  ngOnInit(): void {}

  get formData() {
    return this.dataForm.value;
  }

  addData() {
    if (this.dataForm.valid) {
      this.dataService.addData(this.dataForm.value); // Add form data to service
      this.dataEntries.push(this.dataForm.value); // Add form data to array
      this.dataForm.reset(); // Reset the form
    }
  }
}
