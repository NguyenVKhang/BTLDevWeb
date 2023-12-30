import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import axios from 'axios';

@Component({
  selector: 'app-popular-p',
  templateUrl: './popular-p.component.html',
  styleUrls: ['./popular-p.component.scss']
})
export class PopularPComponent implements OnInit {
  listItem: any;

  constructor(
    private userData: UserDataService,
  ) { }


  ngOnInit(): void {
    const userId = this.userData.getUserData()?.user_id;

    let apiUrl = `http://localhost:3000/pen/getPenByUserSort?user_id=${userId}&sortby=view`;

    axios.get(apiUrl).then((response) => {
      this.listItem = response.data;
      console.log(this.listItem);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
