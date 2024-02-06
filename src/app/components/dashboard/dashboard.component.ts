import {Component, OnInit} from '@angular/core';
import {PageService} from "../../services/page.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    header = ' - Dashboard'
    constructor(private pageService: PageService) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.pageService.setHeader(this.header);
        }, 0);
    }

}
