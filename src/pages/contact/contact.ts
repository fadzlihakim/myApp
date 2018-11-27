import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PeopleProvider } from '../../providers/people/people';
import { DetailContactPage } from '../detail-contact/detail-contact';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public people = [];
  public errorMessage : string;

  public reloadData = false;
  constructor(public navCrtl: NavController, public service:PeopleProvider,)
  {
    this.service.getPeopleFromApi()
    .subscribe(
      (response) => {
        console.log(response);
        this.people = response["results"]
      },
      (error) => console.log(error)
    )
  }
    
    doRefresh(e) 
    {
      this.service.getPeopleFromApi()
      .subscribe(
        (response) => {
          console.log(response);
          this.people = response["results"]
          e.complete()
        },
        (error) => {
          console.log(error)
          e.complete()
        }
      )
    }

    doInfinite(e)
    {
      this.service.getPeopleFromApi()
      .subscribe(
        data => this.people.push(...data["results"]),
        err => console.log(err),
        () => e.complete
      )
    }

    pushPerson(user)
    {
      this.navCrtl.push(DetailContactPage, user)
    }
  
  
  toggleReloadData()
  {
    this.reloadData = !this.reloadData
  }
}

