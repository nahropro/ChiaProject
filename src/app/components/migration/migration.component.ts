import { MigrationService } from './../../services/migration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss']
})
export class MigrationComponent implements OnInit {

  constructor(private migrationService: MigrationService) { }

  ngOnInit(): void {
    this.migrationService.migrations();
  }
}
