import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-gener',
  templateUrl: './gener.component.html',
  styleUrls: ['./gener.component.css']
})
export class GenerComponent implements OnInit {


  Gener="";
  Movies = [];
  constructor(private ev :EventService,private mv:MovieService) { }

  ngOnInit(): void {
    
    this.ev.onn<string>().subscribe(
      //data =>this.Gener = data
      (data) =>{
        this.mv.getByG(data).subscribe((data=> this.Movies = data))
      }
    )
    //this.showMovie();
  }
  

  showMovie()
  {
    console.log(this.Gener)

    //this.mv.getByG(this.Gener).subscribe((data=> this.Movies = data))
    console.log(Object.values(this.Movies ))
  }

}
