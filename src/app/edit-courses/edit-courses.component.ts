import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseListService } from '../course-list/course-list.service';


@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {
  editCourseForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    durationUnit: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  courseId;
  course;
  isSubmitted = false;

  constructor(private courseListService: CourseListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params.id
      if(this.courseId) {
        this.getCourseById();
      }
    }) 
  };
  get formControls() { return this.editCourseForm.controls; }

  getCourseById(){
      this.courseListService.getCourseById(this.courseId).subscribe(res => {
        this.course = res;
          this.editCourseForm = new FormGroup({
            title: new FormControl( this.course.title, [Validators.required]),
            duration: new FormControl( this.course.duration, [Validators.required]),
            durationUnit: new FormControl( this.course.durationUnit, [Validators.required]),
            description: new FormControl( this.course.description, [Validators.required]),
          });
    })
   
  }
  updateCourse(){
    this.isSubmitted = true;
    if(this.editCourseForm.invalid){
      return;
    }
    const course = {
      'id':this.courseId,
      'title': this.editCourseForm.value.title,
      'duration': this.editCourseForm.value.duration,
      'durationUnit': this.editCourseForm.value.durationUnit,
      'description': this.editCourseForm.value.description
    }
    this.courseListService.updateCourse(course).subscribe(res => {
      this.router.navigate([`/courseList`]);
    })
  }

}
