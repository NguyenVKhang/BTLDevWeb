import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { HostService } from 'src/app/host.service';

interface CollectionApiResponse {
  collections?: any[];
  user?: any;
  pen_ids: any[];
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() currentCollectionID: any;
  user: any = {};
  pen_ids: any[] = [1, 3, 4];
  collectionName: string = "em khong biet";
  userName: string = "em khong biet";

  constructor(
    private http: HttpClient,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private myService: HostService,
  ) { }

  ngOnInit(): void {
    // console.log(this.currentCollectionID);

    const user = this.userData.getUserData();
    if (!user) {
      // console.log("Oh no");
      return;
    }
    const userId = user.user_id;

    // Use ActivatedRoute to get the value of collection_id
    this.route.params.subscribe(params => {
      this.currentCollectionID = params['id'];

      // Call getPensInCollection with currentCollectionID
      this.getPensInCollection(this.currentCollectionID);
    });


    this.http.get<CollectionApiResponse>(this.myService.getApiHost() + `/your-work/collections/user/${userId}`).subscribe(
      (response) => {
        this.user = response.user || {};
        this.userName = this.user.name;
        // console.log(this.userName);
      },
      (error) => {
        console.error('Error fetching user information and collection:', error);
      }
    );
  }

  private getPensInCollection(collectionId: number): void {
    this.http.get(this.myService.getApiHost() + `/your-work/collections/${collectionId}/pens`).subscribe(
      (response: any) => {
        this.pen_ids = response.pen_ids || []; // Lấy chỉ pen_ids từ response
        // console.log(this.pen_ids);
        this.collectionName = response.collectionName;
      },
      (error) => {
        console.error('Error fetching the list of pens in the collection:', error);
      }
    );
  }


}
