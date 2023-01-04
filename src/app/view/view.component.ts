import { Component, Input, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { EventService } from '../event.service';
import { MovieService } from '../movie.service';
import { Movie } from './movie';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent implements OnInit {

   title="";
   MovieIds :Movie;
  
  constructor( private ev : EventService, private  MovieService: MovieService) { }

  ngOnInit(): void {
    
    this.ev.onn<string>().subscribe(
      data =>this.title = data
    )
    this.ViewMovie()
    
  }

   ViewMovie(){
    console.log(this.title);
    this.MovieService.getbytitle(this.title).subscribe((data=>this.MovieIds =data));
    //this.MovieService.getConfig()
    //          .subscribe((data => this.MovieIds = data));
  
   }
}
