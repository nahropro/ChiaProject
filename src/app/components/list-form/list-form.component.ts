import { Observable } from 'rxjs';
import { FormServiceService } from './../../services/form-service.service';
import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form.model';
import { DialogData } from 'src/app/models/dialog-data.model';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from "@angular/cdk/clipboard"

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {
  forms$: Observable<Form[]>;

  constructor(private formService: FormServiceService,
              private dialog: MatDialog,
              private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.forms$ = this.formService.getAll();
  }

  delete(id: string){
    const dialogData: DialogData={
      title:'سڕینەوە',
      message:'دڵنیای لە سڕێنەوەی ئەم ئەندامە؟'
    };

    const dialogRef = this.dialog.open(YesNoDialogComponent,{
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.formService.delete(id);
      }
    });
  }

  copyLink(id: string){
    this.clipboard.copy(window.location.host + '/form/fill/' + id);
  }
}
