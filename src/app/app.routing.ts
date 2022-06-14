import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import {
  WindowComponent,
  PaperComponent,
  PaperlistComponent,
  TaglistComponent,
  CatlistComponent,
} from "./core/components";

const routes: Routes = [
  { path: "", redirectTo: "fa-ir/index/index", pathMatch: "full" },
  { path: "blog/:slug", component: PaperComponent },
  { path: "bloglist/:cat", component: PaperlistComponent },
  { path: "tags/:tag", component: TaglistComponent },
  { path: "catlist", component: CatlistComponent },
  { path: ":language/:type/:window_slug", component: WindowComponent },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
