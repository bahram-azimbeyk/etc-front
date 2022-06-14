import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as moment from "jalali-moment";

@Pipe({ name: "sainitizeHtml", pure: false })
export class sanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
@Pipe({
  name: "jalali",
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let MomentDate = moment(value, "YYYY/MM/DD");
    return MomentDate.locale("fa").format("YYYY/M/D");
  }
}
