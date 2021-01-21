import { Component, OnInit } from '@angular/core';
import { BackupService } from './../../services/backup.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  constructor(private backupService: BackupService) { }

  ngOnInit(): void {
  }

  saveBackUp(){
    this.backupService.saveBackup('Data');
  }
}
