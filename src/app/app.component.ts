import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fb';
  constructor(private db: DatabaseService) { }
  ngOnInit(): void {
    this.db.firebaseInit();
  }
}
