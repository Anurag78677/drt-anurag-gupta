import { Component, Input, OnInit } from '@angular/core';
import { CourseListService } from '../course-list/course-list.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  @Input() set data(value: Array<{}>) {
    this.allCourses = value;
  }

  @Input() set columns(value: Array<{}>) {
    this.allColumn = value;
  }
  @Input() searchTitle: any;
  ngOnInit(): void {
    console.log(this.searchTitle, 'searchTitle');

  }



  deleteCourse(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your Record has been deleted.',
          'success'
        )
        this.courseListService.deleteCourse(id).subscribe(res => {
          window.location.reload()
        })
      }
    })

  }
  editCourse(courseId) {
    this.router.navigate([`/editCourses/${courseId}`]);
  }
}
