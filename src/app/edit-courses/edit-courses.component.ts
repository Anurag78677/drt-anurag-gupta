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

  getCourseById(){
      this.courseListService.getCourseById(this.courseId).subscribe(res => {
          this.course = res;
          console.log( this.course);
    })
   
  }
  updateCourse(){
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
