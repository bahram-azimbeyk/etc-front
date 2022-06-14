import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    isPopState = false;
    constructor(
        private router: Router,
        private locationStrategy: LocationStrategy
    ) {}
    ngOnInit() {
        this.locationStrategy.onPopState(() => {
            this.isPopState = true;
        });
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (!this.isPopState) window.scrollTo(0, 0);
                this.isPopState = false;
            }
        });
    }
}
