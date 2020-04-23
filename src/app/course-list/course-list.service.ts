import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {

  constructor(private http: HttpClient) { }

  getCourseList() {
    console.log('inside course list service');
    return this.http.get(environment.API_URL + 'courses');
  }
  saveCourse(body) {
    console.log('inside saveCourse list service');
    return this.http.post(environment.API_URL + 'courses', body);
  }
  deleteCourse(id) {
    return this.http.delete(environment.API_URL + "courses/" + id);
  }
  getCourseById(id) {
    return this.http.get(environment.API_URL + "courses/" + id);
  }
  updateCourse(course) {
    return this.http.put(environment.API_URL +"courses/" + course.id, course);
  }
}
