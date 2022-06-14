import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatSidenavModule } from "@angular/material/sidenav";

import { AppComponent } from "./app.component";
import * as CoreComponents from "./core/components";
import { LottieModule } from "ngx-lottie";
import { InViewportModule } from "ng-in-viewport";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import * as Pipe from "./core/pipes";

import { VgCoreModule } from "@videogular/ngx-videogular/core";
import { VgControlsModule } from "@videogular/ngx-videogular/controls";
import { VgOverlayPlayModule } from "@videogular/ngx-videogular/overlay-play";
import { VgBufferingModule } from "@videogular/ngx-videogular/buffering";

export function playerFactory() {
  return import("lottie-web");
}

@NgModule({
  declarations: [
    AppComponent,
    CoreComponents.WindowComponent,
    CoreComponents.NavbarComponent,
    CoreComponents.HeaderComponent,
    CoreComponents.BodyComponent,
    CoreComponents.FooterComponent,
    CoreComponents.HeadingComponent,
    CoreComponents.FormComponent,
    CoreComponents.CardBoxComponent,
    CoreComponents.ExpansionBoxComponent,
    CoreComponents.VideoComponent,
    CoreComponents.PaperComponent,
    CoreComponents.PaperlistComponent,
    CoreComponents.CatlistComponent,
    CoreComponents.TaglistComponent,
    Pipe.sanitizeHtmlPipe,
    Pipe.JalaliPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MarkdownModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
    InViewportModule,
    MatExpansionModule,
    MatDividerModule,
    MatSidenavModule,
    MatSnackBarModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
