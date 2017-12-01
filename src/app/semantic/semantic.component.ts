import {
  NgModule, NgZone, Component, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, ElementRef, ViewChild
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DomSanitizer } from '@angular/platform-browser';
import { BackService } from '../provider/back.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

declare var google;

@Component({
  selector: 'app-semantic',
  templateUrl: './semantic.component.html',
  styleUrls: ['./semantic.component.css']
})
export class SemanticComponent implements OnInit {

  rssQuestions = [];

  zoom = 2;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private backservice: BackService,
    private fb: FormBuilder,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.backservice.getQuestions().then(rssQ => { this.rssQuestions = rssQ; console.log(rssQ); });
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  latitude(url) {
    this.mapsAPILoader.load().then(() => {
      console.log('google script loaded');
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': url }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          return results[0].geometry.location.lat();
        } else {
          alert('Something got wrong ' + status);
        }
      });
    });
    console.log(url);
  }

  longitude(url) {
    this.mapsAPILoader.load().then(() => {
      console.log('google script loaded');
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': url }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          return results[0].geometry.location.lng();
        } else {
          alert('Something got wrong ' + status);
        }
      });
    });
    console.log(url);
  }

}
