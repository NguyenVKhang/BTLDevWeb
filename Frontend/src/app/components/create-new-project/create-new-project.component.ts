import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios, { AxiosError } from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss', '../../pages/settings/style-settings.scss']
})
export class CreateNewProjectComponent {
  @Output() closeProject = new EventEmitter<void>();

  createForm: FormGroup;
  maxCharacterLimit = 1000;

  constructor(private fb: FormBuilder, private userData: UserDataService) {
    this.createForm = this.fb.group({
      projectTitle: ['', [Validators.required, Validators.maxLength(this.maxCharacterLimit)]],
      projectDescription: ['', [Validators.maxLength(this.maxCharacterLimit)]],
    });
  }

  onCloseCreateNewProject() {
    this.closeProject.emit();
  }

  async onSubmit() {
    // -> to localhost:3000/project/123
    window.location.href = 'http://localhost:4200/project/123';
    

    // TODO: Implement this
  //   if (this.createForm.valid) {
  //     try {
  //       const user = this.userData.getUserData();
  //       const userId = user?.user_id;

  //       if (!userId) {
  //         console.error('User ID not available.');
  //         return;
  //       }

  //       const response = await axios.post(`http://localhost:3000/your-work/projects/`, {
  //         name: this.createForm.value.projectTitle,
  //         user_id: userId,
  //         // Add other fields if needed
  //       });

  //       console.log('project created successfully:', response.data.project);

  //       this.createForm.reset();
  //       this.onCloseCreateNewproject();
  //     } catch (error) {
  //       if (axios.isAxiosError(error) && error.response) {
  //         console.error('Error creating project:', error);
  //         const errorMessage = (error as AxiosError<{ error?: string }>).response?.data?.error;
  //         console.error('Error message:', errorMessage || 'Unknown error');
  //       } else {
  //         console.error('Error creating project:', error);
  //       }
  //     }
  //   }
  }
}