import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public db: DatabaseService) { }

  ngOnInit() {
  }

  clearNotifications() {
    this.db.updateNotifications(0);
  }
}
