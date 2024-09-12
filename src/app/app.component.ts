import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddDataComponent } from './components/add-data/add-data.component';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddDataComponent, ViewDataComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Temperature-Data-Analysis';
}
