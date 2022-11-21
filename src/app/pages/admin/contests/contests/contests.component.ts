import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

  contests!: any
  paginationLinks: { url?: string, label: string, active: boolean }[] = [];
  current_page = 1;

  isFetching = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.current_page = +params['page'];

      if (this.current_page <= 0) {
        this.router.navigate(['/admin/contests/page/1']);
      }

      this.getContests();
    })
  }


  getContests() {
    this.isFetching = true;
    this.http.get<any>(`https://admin.svpoly.xyz/api/public/contests/?page=${this.current_page}`).subscribe(response => {
      if (response.status) {
        this.contests = response.payload.data;
        console.log(response.payload.data);
        
        this.paginationLinks = response.payload.links;
        this.isFetching = false;
      }
    })
  }

}
