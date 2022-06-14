import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Location } from "@angular/common";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

import { Observable, Subscription } from "rxjs";
import { AnimationOptions } from "ngx-lottie";
import { AnimationItem } from "lottie-web";
import * as Rellax from "rellax";
import { MediaMatcher } from "@angular/cdk/layout";
import {
  CoreNavbar,
  CoreHeading,
  CoreWindow,
  CoreFooter,
  CoreBody,
  CoreHeader,
  CoreForm,
  CoreCardBox,
  CoreSection,
  CoreHeaderButton,
  CoreExpansionBox,
  CoreVideo,
  CoreSnakBar,
} from "./models";
import { MatSnackBar } from "@angular/material/snack-bar";
import { APIService } from "./services";
import { Urls } from "../settings";
import { SimpleWindow } from "./mock";
import { filter } from "rxjs/operators";
@Component({
  selector: "core-window",
  templateUrl: "./templates/window.html",
})
export class WindowComponent implements OnInit {
  _window: CoreWindow;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: APIService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    const language = this.activatedRoute.snapshot.paramMap.get("language");
    const type = this.activatedRoute.snapshot.paramMap.get("type");
    const window_slug =
      this.activatedRoute.snapshot.paramMap.get("window_slug");
    this.getWindow(language, type, window_slug).subscribe((http_window) => {
      this._window = http_window;
      this.titleService.setTitle(this._window.tab_title);
    });
  }

  getWindow(
    language: string,
    type: string,
    window_slug: string
  ): Observable<CoreWindow> {
    return this.apiService.get<CoreWindow>(
      `${Urls.rootUrl}/api/core/window/${language}/${type}/${window_slug}`
    );
  }
}
@Component({
  selector: "core-paper",
  templateUrl: "./templates/paper.html",
})
export class PaperComponent implements OnInit {
  paper: any;
  _window = SimpleWindow;
  slug: string;
  mediaUrl = Urls.rootUrl;
  routerEvents$;
  error = false;
  subscription: Subscription;
  options: AnimationOptions = {
    path: "assets/json/paper-loading.json",
  };
  styles: Partial<CSSStyleDeclaration> = {
    opacity: "0.2",
  };
  options404: AnimationOptions = {
    path: "assets/json/404-error.json",
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: APIService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.routerEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
  }
  ngOnInit() {
    this.main();
    this.subscription = this.routerEvents$.subscribe((event) => {
      this.main();
    });
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
  main() {
    this.slug = this.activatedRoute.snapshot.paramMap.get("slug");
    if (this.slug) {
      this.getPaper(this.slug).subscribe(
        (paper) => {
          this.paper = paper;
          this.titleService.setTitle(this.paper.title);
          this.metaService.addTags([
            { name: "description", content: this.paper.description },
            { name: "keywords", content: this.paper.tags },
          ]);
        },
        (error) => {
          this.error = true;
        }
      );
    }
  }
  getPaper(slug: string) {
    return this.apiService.get(`${Urls.rootUrl}/api/admin/paper/${slug}/`);
  }
}

@Component({
  selector: "core-catlist",
  templateUrl: "./templates/catlist.html",
})
export class CatlistComponent implements OnInit {
  catlist: any;
  _window = SimpleWindow;
  mediaUrl = Urls.rootUrl;
  routerEvents$;
  options: AnimationOptions = {
    path: "assets/json/paper-loading.json",
  };
  styles: Partial<CSSStyleDeclaration> = {
    opacity: "0.2",
  };
  subscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private apiService: APIService,
    private router: Router
  ) {
    this.routerEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
  }
  ngOnInit() {
    this.main();
    this.subscription = this.routerEvents$.subscribe((event) => {
      this.main();
    });
    this.titleService.setTitle("لیست مطالب سایت");
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
  main() {
    this.getPaperlist().subscribe((catlist) => {
      this.catlist = catlist;
    });
  }
  getPaperlist() {
    return this.apiService.get(
      `${Urls.rootUrl}/api/admin/paperparentcategory/`
    );
  }
}
@Component({
  selector: "core-paperlist",
  templateUrl: "./templates/paperlist.html",
})
export class PaperlistComponent implements OnInit {
  paperlist: any;
  _window = SimpleWindow;
  mediaUrl = Urls.rootUrl;
  cat: string;
  routerEvents$;
  options: AnimationOptions = {
    path: "assets/json/paper-loading.json",
  };
  styles: Partial<CSSStyleDeclaration> = {
    opacity: "0.2",
  };
  subscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private apiService: APIService,
    private router: Router
  ) {
    this.routerEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
  }
  ngOnInit() {
    this.cat = this.activatedRoute.snapshot.paramMap.get("cat");
    this.main();
    this.subscription = this.routerEvents$.subscribe((event) => {
      this.main();
    });
    this.titleService.setTitle("لیست مطالب سایت");
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
  main() {
    this.getPaperlist().subscribe((paperlist) => {
      this.paperlist = paperlist;
    });
  }
  getPaperlist() {
    return this.apiService.get(
      `${Urls.rootUrl}/api/admin/papercategory/${this.cat}`
    );
  }
}
@Component({
  selector: "core-taglist",
  templateUrl: "./templates/taglist.html",
})
export class TaglistComponent implements OnInit {
  paperlist: any;
  _window = SimpleWindow;
  mediaUrl = Urls.rootUrl;
  routerEvents$;
  tag: string;
  options: AnimationOptions = {
    path: "assets/json/paper-loading.json",
  };
  styles: Partial<CSSStyleDeclaration> = {
    opacity: "0.2",
  };
  subscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private apiService: APIService,
    private router: Router
  ) {
    this.routerEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
  }
  ngOnInit() {
    this.main();
    this.subscription = this.routerEvents$.subscribe((event) => {
      this.main();
    });
    this.titleService.setTitle("لیست مطالب سایت");
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
  main() {
    this.tag = this.activatedRoute.snapshot.paramMap.get("tag");
    if (this.tag) {
      this.getPaperlist().subscribe((paperlist) => {
        this.paperlist = paperlist;
      });
    }
  }
  getPaperlist() {
    return this.apiService.get(`${Urls.rootUrl}/api/admin/tag/${this.tag}`);
  }
}

@Component({ selector: "core-navbar", templateUrl: "./templates/navbar.html" })
export class NavbarComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  _navbar: CoreNavbar;

  private toggleButton: any;
  sidebarVisible = false;

  constructor(public location: Location, private element: ElementRef) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this._window.components.forEach((element) => {
      if (element.component_type === "navbar") {
        this._navbar = element;
      }
    });
  }
  @HostListener("window:scroll")
  onWindowScroll() {
    let element = document.querySelector(".navbar");
    if (window.pageYOffset < element.clientHeight) {
      element.classList.add("navbar-transparent");
    } else {
      element.classList.remove("navbar-transparent");
    }
  }
  sidebarOpen(): void {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose(): void {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle(): void {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}
@Component({ selector: "core-header", templateUrl: "./templates/header.html" })
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  _window: CoreWindow;
  _header: CoreHeader;
  _header_btns: CoreHeaderButton[];
  _vectors: any[];
  options: AnimationOptions;
  private animationItem: AnimationItem;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.mobileQuery = media.matchMedia("(max-height:500px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }
  ngOnInit() {
    var rellaxHeader = new Rellax(".rellax-header");

    this._window.components.forEach((element) => {
      if (element.component_type === "header") {
        this._header = element;
        this._header_btns = this._header.components.filter((element) => {
          return element.component_type === "header_btn";
        });
        this._vectors = this._header.components.filter((element) => {
          return element.component_type === "header_vector";
        });
        this.options = this._header.attrs.anim_filename
          ? {
              path: `/assets/json/${this._header.attrs.anim_filename}`,
            }
          : null;
      }
    });
  }
  ngOnDestroy() {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  pause(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.pause());
  }
  play(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }
}
@Component({ selector: "core-body", templateUrl: "./templates/body.html" })
export class BodyComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  _body: CoreBody;

  has_header = false;

  ngOnInit() {
    this._window.components.forEach((item) => {
      if (item.component_type === "body") {
        this._body = item;
        console.log(item);
      }
    });
    var found = false;
    this._body.components.forEach((element) => {
      if (element.component_type === "header") found = true;
    });
    this.has_header = found;
  }
}
@Component({
  selector: "core-cardbox",
  templateUrl: "./templates/cardbox.html",
})
export class CardBoxComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  @Input()
  _cardbox: CoreCardBox;
  ngOnInit() {}
}

@Component({
  selector: "core-expansionbox",
  templateUrl: "./templates/expansionbox.html",
})
export class ExpansionBoxComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  @Input()
  _expansionbox: CoreExpansionBox;
  ngOnInit() {}
}
@Component({
  selector: "core-video",
  templateUrl: "./templates/video.html",
})
export class VideoComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  @Input()
  _video: CoreVideo;
  ngOnInit() {}
}

@Component({ selector: "core-footer", templateUrl: "./templates/footer.html" })
export class FooterComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  _footer: CoreFooter;
  ngOnInit() {
    this._window.components.forEach((element) => {
      if (element.component_type === "footer") {
        this._footer = element;
      }
    });
  }
}
@Component({
  selector: "core-heading",
  templateUrl: "./templates/heading.html",
  animations: [
    trigger("loop", [
      state(
        "start",
        style({
          transform: "translateX(-10%)",
        })
      ),
      state(
        "end",
        style({
          transform: "translateX(+10%)",
        })
      ),
      transition("hidden=>visible", [animate("1s")]),
    ]),
  ],
})
export class HeadingComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  @Input()
  _heading: CoreHeading;

  options: any = {};
  explored = false;
  animTrigger = "start";

  constructor() {}

  ngOnInit() {
    this._heading.components.forEach((section) => {
      var option = section.attrs.anim_filename
        ? {
            path: `/assets/json/${section.attrs.anim_filename}`,
          }
        : null;
      this.options[section.id] = option;
    });
  }
  onView(event) {
    if (event.visible === true) {
      this.explored = true;
    }
  }
  animLoop(event: any) {
    console.log(event);
    // this.animTrigger = event.toState === "start" ? "end" : "start";
  }
}

@Component({
  selector: "core-form",
  templateUrl: "./templates/form.html",
})
export class FormComponent implements OnInit {
  @Input()
  _window: CoreWindow;
  @Input()
  _form: CoreForm;

  loading = false;

  formGroup = new FormGroup({});
  errors: any = {};
  was_validated = false;
  constructor(private apiService: APIService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this._form.components.forEach((input) => {
      var validators_list = [];
      if (input.attrs.required) {
        validators_list.push(Validators.required);
      }
      if (input.attrs.pattern) {
        validators_list.push(Validators.pattern(input.attrs.pattern));
      }
      var control = new FormControl(input.attrs.value, validators_list);
      this.formGroup.addControl(input.name, control);
    });
  }
  getControlErrors(control_name: string, error_message: string) {
    var res = [];
    var control = this.formGroup.get(control_name);
    if (control.errors) {
      if ("required" in control.errors) res.push("این فیلد اجباری میباشد");
      if ("pattern" in control.errors) res.push(error_message);
    }
    if (control_name in this.errors) res.push(this.errors[control_name]);
    return res;
  }
  onFileChange(event, inputName) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get(inputName).setValue(file);
    }
  }
  onSubmit(): void {
    this.was_validated = true;
    this.errors = {};
    const formData = new FormData();
    for (let inp of Object.keys(this.formGroup.controls)) {
      formData.append(inp, this.formGroup.get(inp).value);
    }
    if (this.formGroup.valid) {
      if (this._form.attrs.method === "post") {
        this.loading = true;
        this.apiService
          .post(
            `${Urls.rootUrl}/api/${this._form.name}`,
            formData,
            false,
            false
          )
          .subscribe(
            (result) => {
              this.loading = false;
              this.snackBar
                .open("ثبت نام شما با موفقیت انجام شد", "", {
                  duration: 4000,
                  horizontalPosition: "center",
                })
                .afterDismissed()
                .subscribe(() => {
                  window.location.href = "/fa-ir/index/index";
                });
            },
            (error) => {
              this.loading = false;
              console.log(error);
              this.errors = error.error;
            }
          );
      }
    }
  }
}
