import { Component, Input, OnInit } from '@angular/core';
import { CourseListService } from '../course-list/course-list.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-listing',
  templateUrl: './table-listing.component.html',
  styleUrls: ['./table-listing.component.css']
})
export class TableListingComponent implements OnInit {
  @Input() options;
  allCourses;
  allColumn;
 
  constructor(private courseListService: CourseListService,
    private router: Router) { }

  ngOnInit(): void {
  }
  @Input() set data(value: Array<{}>) {
    this.allCourses = value;
  }

  @Input() set columns(value: Array<{}>) {
    this.allColumn = value;
  }

  deleteCourse(id: any) {
    this.courseListService.deleteCourse(id).subscribe(res => {
      window.location.reload()
    })
  }
  editCourse(courseId) {
      this.router.navigate([`/editCourses/${courseId}`]);
  }
}
