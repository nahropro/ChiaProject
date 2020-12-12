import { Observable, Subscription } from 'rxjs';
import { FormServiceService } from './../../services/form-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ListFormComponent implements OnInit, OnDestroy {
  formSubscription: Subscription;
  forms: Form[];
  filterForms: Form[];
  filterText: string='';

  constructor(private formService: FormServiceService,
              private dialog: MatDialog,
              private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.formSubscription = this.formService.getAll().subscribe(f=> {
      this.forms=f;
      this.filter();
    });
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

  filter(){
    const pureFilterText=this.filterText.trim();

    if(pureFilterText){
      this.filterForms=this.forms.filter(d=> d.personalInfo.fullName.includes(pureFilterText));
    }
    else {
      this.filterForms=this.forms;
    }
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
