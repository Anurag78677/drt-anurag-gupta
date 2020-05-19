import { Component, OnInit } from '@angular/core';
import { CourseListService } from '../course-list/course-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  courseForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    durationUnit: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  courseId;
  course;
  isSubmitted =false;

  constructor(private courseListService: CourseListService,
    private router: Router,
    ) { }

  ngOnInit() {

  };
  get formControls() { return this.courseForm.controls; }

  saveCourse() {
    this.isSubmitted = true;
    if(this.courseForm.invalid){
      return;
    }
    console.log('inside course list component',this.courseForm);
    const course = {
      'title': this.courseForm.value.title,
      'duration': this.courseForm.value.duration,
      'durationUnit': this.courseForm.value.durationUnit,
      'description': this.courseForm.value.description
    }
    this.courseListService.saveCourse(course).subscribe(res => {
      this.router.navigate([`/courseList`]);
    })
  }
  
}
