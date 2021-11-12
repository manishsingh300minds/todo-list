import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import {ActivatedRoute} from "@angular/router";
import {PostType} from "../listing/listing.component";

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  postForm!: FormGroup;
  private mode = 'create';
  post: any;
  editPostId : any;
  cardTitle = '';
  submitText = '';

  constructor(private postService : PostsService, public route : ActivatedRoute) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title : new FormControl(null,{
        validators : [Validators.required]
      }),
      description : new FormControl(null,{
        validators : [Validators.required]
      }),
      // image : new FormControl(null,{
      //   validators : [Validators.required],
      //   asyncValidators : [mimeType]
      // }),
    });

    this.route.paramMap.subscribe((param) => {
      if(param.has('title')){
        this.post = {
          title : param.get('title'),
          description : param.get('description')
        }
        this.editPostId = param.get('id');
        this.mode = 'edit';
        this.cardTitle = 'Update your Post!!'
        this.submitText = 'Update Post';
      }
      else{
        this.post = {};
        this.mode = 'create';
        this.cardTitle = 'Add a new Post!!'
        this.submitText = 'Add Post';
      }
    });
  }

  addPost(){
    const newPost = this.postForm.value;
    console.log('new post',newPost,this.mode,this.editPostId);
    if(this.mode === 'create'){
      this.postService.addPost(newPost).subscribe((res)=>{
          console.log("Response from server",res);
          this.postForm.reset();
        },
        (error : any) => console.log("Server error:",error));
    } else{
      this.postService.updatePost(this.editPostId,newPost.title,newPost.description).subscribe((res) => {
        console.log("Update response from server",res);
        this.postForm.reset();
      },
        (error : any) => console.log("Updating server error:",error));
    }

  }
}
