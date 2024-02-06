import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {menuOptions} from "../../models/menu-options";
import {PageService} from "../../services/page.service";
import {distinctUntilChanged} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

    appName = environment.appName;
    menuOptions = menuOptions;
    opened = false;
    page = '';

    constructor(private pageService: PageService,
                private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.pageService.getHeader().pipe(
            distinctUntilChanged()
        ).subscribe(header => {
            this.page = header;
        });
    }

    ngAfterViewInit(): void {

    }

    logout() {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('permissoes');
        this.router.navigate(['login']);
    }
}
