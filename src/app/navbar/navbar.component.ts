import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { FormGroup , FormControl,FormBuilder } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { EventService } from '../event.service';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MovieService]
})
export class NavbarComponent implements OnInit {


  address: FormGroup;
  constructor(private MovieService: MovieService,private fb: FormBuilder, private ev : EventService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.address = this.fb.group({
      MovieName: [''],
      R_Year: [''],
      Gener: [''],
      ActorName :['']
      })
  }
   
 
  onSubmit() {
    console.log(this.address.value);
    this.MovieService.postConfig(this.address.value).subscribe(response=> 
      {
        alert("Movie added succesfully")
        console.log("success",response),
   error=> console.log("error",error)}
    )
  }
  onClose()
  {
    console.log("Hello")
    console.log([this.router.url])
    this.router.navigate([this.router.url])
     
  }

  onAction(type : string)
  {
    console.log(type)
    this.ev.emitt<string>(type);
  }
}
