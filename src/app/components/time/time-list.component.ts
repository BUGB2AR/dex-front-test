import { Component } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
import { Team } from '../../models/time.model';

@Component({
  selector: 'app-time-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.scss']
})
export class TimeListComponent {
  displayedColumns: string[] = ['nome', 'franquia', 'funcao', 'data', 'actions'];

  dataSource: Team[] = [];
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTimes();
  }

  loadTimes() {
    this.loading = true;
    this.apiService.getTeams().subscribe({
      next: (times) => {
        this.dataSource = times;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}