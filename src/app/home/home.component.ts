import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MovieService } from '../movie.service';
import { FormGroup , FormControl,FormBuilder } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MovieService]
})

export class HomeComponent implements OnInit {

  address : FormGroup;
  Movie=[];
  MovieId=[];
 
  
  constructor(private MovieService: MovieService,private fb: FormBuilder, private ev : EventService) { }

  ngOnInit(): void {
    this.showConfig();
    this.address = this.fb.group({
      MovieName: [''],
      R_Year: [''],
      Gener: [''],
      ActorName :['']
      })
  }
   

onSubmit() {
  console.log(this.address.value);
  this.MovieService.patchConfig(this.address.value).subscribe(response=>{this.showConfig()} 
    //console.log("success",response),
 //rror=> console.log("error",error)
  )
}

  showConfig() {
    
    this.MovieService.getConfig()
              .subscribe((data => this.Movie = data));
  }
  onEdit(title:String)
  {
    console.log(title);
    this.MovieService.getbytitle(title).subscribe((data)=>{
      this.address.patchValue({
      
        MovieName:Object.values(data)[0],
        R_Year:Object.values(data)[1],
        Gener:Object.values(data)[2],
        ActorName:Object.values(data)[3]
      })
    });
    console.log((this.MovieId))
    
  }
  
  onView(title:String)
  {
    console.log(title)
    this.ev.emitt<String>(title);

  }
  onDelete(title : string)
  {
    console.log(title)
    if(confirm('Are you sure to delete this Movie?')==true){
     return this.MovieService.mdelete(title).subscribe((res=>
      {
        this.showConfig();

      })) 
    }
  }

 

   

}
