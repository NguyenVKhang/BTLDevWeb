import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios, { AxiosError } from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-create-new-collection',
  templateUrl: './create-new-collection.component.html',
  styleUrls: ['./create-new-collection.component.scss', '../../pages/settings/style-settings.scss']
})
export class CreateNewCollectionComponent {
  @Output() close = new EventEmitter<void>();

  createForm: FormGroup;
  maxCharacterLimit = 1000;

  constructor(private fb: FormBuilder, private userData: UserDataService) {
    this.createForm = this.fb.group({
      collectionTitle: ['', [Validators.required, Validators.maxLength(this.maxCharacterLimit)]],
      collectionDescription: ['', [Validators.maxLength(this.maxCharacterLimit)]],
    });
  }

  onCloseCreateNewCollection() {
    this.close.emit();
  }

  async onSubmit() {
    if (this.createForm.valid) {
      try {
        const user = this.userData.getUserData();
        const userId = user?.user_id;

        if (!userId) {
          console.error('User ID not available.');
          return;
        }

        const response = await axios.post(`http://localhost:3000/your-work/collections/`, {
          name: this.createForm.value.collectionTitle,
          user_id: userId,
          // Add other fields if needed
        });

        console.log('Collection created successfully:', response.data.collection);

        this.createForm.reset();
        this.onCloseCreateNewCollection();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Error creating collection:', error);
          const errorMessage = (error as AxiosError<{ error?: string }>).response?.data?.error;
          console.error('Error message:', errorMessage || 'Unknown error');
        } else {
          console.error('Error creating collection:', error);
        }
      }
    }
  }
}