import { Component, OnInit } from '@angular/core';
import { CourseListService } from './course-list.service'

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  columns = [
    { title: 'ID', name: 'id' },
    { title: 'Title', name: 'title' },
    { title: 'Duration', name: 'duration' },
    { title: 'Duration Unit', name: 'durationUnit' },
    { title: 'Description', name: 'description' },
  ];
  courseList;
  constructor(private courseListService: CourseListService) { }

  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList() {
    console.log('inside course list component');
    this.courseListService.getCourseList().subscribe(res => {
      this.courseList = res;
      console.log(res, 'response');
    })
  }

}
