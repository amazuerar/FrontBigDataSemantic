import {
  NgModule, NgZone, Component, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, ElementRef, ViewChild
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DomSanitizer } from '@angular/platform-browser';
import { BackService } from '../provider/back.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { DecimalPipe } from '@angular/common';

declare var google;

@Component({
  selector: 'app-semantic',
  templateUrl: './semantic.component.html',
  styleUrls: ['./semantic.component.css']
})
export class SemanticComponent implements OnInit {

  public loading = false;
  query = '';
  rssQuestions = [];
  entitiesByID = [];
  answersById = [];
  markersByID = [];
  tracksByID = [];
  tweetsByID = [];
  similarByID = [];
  sparqlEntityByID = [];

  lat = 4.5981;
  lng = -74.0758;
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
    this.loading = true;
    this.backservice.getQuestions()
      .then(
      (rssQ) => {
        this.rssQuestions = rssQ; this.loading = false;
      },
      (error) => { console.error(error); this.loading = false; }
      );
  }

  getEnrichment(id) {
    this.entitiesByID = [];
    this.answersById = [];
    this.markersByID = [];
    this.tracksByID = [];
    this.tweetsByID = [];
    this.similarByID = [];
    this.sparqlEntityByID = [];



    this.loading = true;
    this.backservice.getLocationsByID(id).then((locations) => { this.markersByID = locations; this.loading = false; },
      (error) => { console.error(error); this.loading = false; });

    this.loading = true;
    this.backservice.getEntitiesByID(id).then((entities) => { this.entitiesByID = entities; this.loading = false; },
      (error) => { console.error(error); this.loading = false; });

    this.loading = true;
    this.backservice.getAnswersByID(id).then((answers) => { this.answersById = answers; this.loading = false; },
      (error) => { console.error(error); this.loading = false; });

    this.loading = true;
    this.backservice.getTracksByID(id).then((tracks) => { this.tracksByID = tracks; this.loading = false; },
      (error) => { console.error(error); this.loading = false; });

    this.loading = true;
    this.backservice.getTweetsByID(id).then((tweets) => { this.tweetsByID = tweets; this.loading = false; },
      (error) => { console.error(error); this.loading = false; });

    this.loading = true;
    this.backservice.GetSparqlQueryByID(id).then((sparql) => { this.sparqlEntityByID = sparql; this.loading = false; console.log(sparql); },
      (error) => { console.error(error); this.loading = false; });

    this.loading = true;
    this.backservice.getSimilarQuestionsByID(id).then((similar) => { this.similarByID = similar; this.loading = false; },
      (error) => { console.error(error); this.loading = false; });

    this.loading = false;

  }

  search() {

    if (this.query !== '') {
      this.rssQuestions = [];
      this.entitiesByID = [];
      this.answersById = [];
      this.markersByID = [];
      this.tracksByID = [];
      this.tweetsByID = [];
      this.similarByID = [];
      this.sparqlEntityByID = [];
      this.loading = true;
      this.backservice.getQuestionsByQuery(this.query)
        .then(
        (rssQ) => {
          this.rssQuestions = rssQ; this.loading = false;
        },
        (error) => { console.error(error); this.loading = false; }
        );
    } else {
      alert('Write whatever you are seeking for');
    }

  }

  clean() {
    this.query = '';
    this.rssQuestions = [];
    this.entitiesByID = [];
    this.answersById = [];
    this.markersByID = [];
    this.tracksByID = [];
    this.tweetsByID = [];
    this.similarByID = [];
    this.sparqlEntityByID = [];
    this.loading = true;
    this.backservice.getQuestions()
      .then(
      (rssQ) => {
        this.rssQuestions = rssQ; this.loading = false;
      },
      (error) => { console.error(error); this.loading = false; }
      );
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getUriTrack(uri) {
    return 'https://embed.spotify.com/?uri=' + uri;
  }

  getUrlOpenAlbum(uri) {
    return 'https://open.spotify.com/embed?uri=' + uri;
  }

  getYoutubeUrlOpenAlbum(uri, name) {
    return 'https://www.youtube.com/results?search_query=' + uri + ' ' + name;
  }

  getTweetStatusm(name, id) {
    return 'https://twitter.com/' + name + '/status/' + id;
  }

  marketImage(name) {
    const mark = name.toLowerCase();
    return 'assets/' + mark + '.png';
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
