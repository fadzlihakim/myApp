import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { PeopleProvider } from '../../providers/people/people';
import { DetailContactPage } from '../detail-contact/detail-contact';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public people = [];
  public peopleAll = [];
  public page = 0;
  public genderType ="";
  public errorMessage : string;
  public reloadData = false;

  constructor(public navCrtl: NavController, public service:PeopleProvider, public actionSheetCtrl: ActionSheetController)
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
        () => e.complete()
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

  searchPerson(e)
  {
    console.log(e.target.value)
    this.people = this.people.filter((person) => {
      return person.name.first.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
      person.name.last.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    })
    console.log(this.people) 
  }

  actionFilter()
  {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Filter your contact',
      buttons: [
        {
          text: 'Male',
          role: 'male',
          handler: () => {
            this.genderType = "male"
            this.page = 0
            this.service.getPeopleFilterGender(this.genderType,this.page)
            .subscribe(
              (response) => {
                console.log(response);
                this.people = response["results"]
                this.peopleAll = this.people
                this.page = this.page + 1
              },
              (error) => console.log(error)
            )
          }
        },
        {
          text: 'Female',
          role: 'female',
          handler: () => {
            this.genderType = "female"
            this.page = 0
            this.service.getPeopleFilterGender(this.genderType,this.page)
            .subscribe(
              (response) => {
                console.log(response);
                this.people = response["results"]
                this.peopleAll = this.people
                this.page = this.page + 1
              },
              (error) => console.log(error)
            )
          }
        },
        {
          text: 'No Filter',
          role: 'no filter',
          handler: () => {
            this.genderType = ""
            this.page = 0
            this.service.getPeopleFilterGender(this.genderType,this.page)
            .subscribe(
              (response) => {
                console.log(response);
                this.people = response["results"]
                this.peopleAll = this.people
              },
              (error) => console.log(error)
            )
          }
        }
      ]
    });
    actionSheet.present();
  }
}

