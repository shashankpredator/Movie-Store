import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { MovieService } from '../movie.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent  {
  title = 'autocomplete';
  u :string="";
  options = ["Sam", "Varun", "Jasmine"];

  filteredOptions;


  formGroup : FormGroup;
  constructor(private service : MovieService, private fb : FormBuilder,private ev:EventService){}

  ngOnInit(){
    this.initForm();
    this.getNames();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'MovieSearch' : ['']
    })
    this.formGroup.get('MovieSearch').valueChanges.subscribe(response => {
      console.log('data is ', response);
      this.filterData(response);
    })
  }

  filterData(enteredData){
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  getNames(){
    this.service.getData().subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
  onSubmit()
  {
    this.u =JSON.stringify(Object.values(this.formGroup.value)[0]);
    this.u=JSON.parse(this.u)
    this.ev.emitt<string>(this.u);
  }

}
