import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FormGear } from 'form-gear';
import '../../node_modules/form-gear/dist/style.css';
import reference from '../data/reference.json'
import template from '../data/template.json'
import preset from '../data/preset.json'
import response from '../data/response.json'
import validation from '../data/validation.json'
import media from '../data/media.json'
import remark from '../data/remark.json'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor() { }

  async ngOnInit() {

    function initForm(reference: any, template: any, preset: any, response: any, validation: any, media: any, remark: any) {

      let config = {
        clientMode: 1, // CAWI = 1, CAPI = 2
        token: `aeyJ0eXA`,
        baseUrl: ``,
        lookupKey: `key%5B%5D`,
        lookupValue: `value%5B%5D`,
        lookupMode: 1, // 1 => ONLINE ; 2 => OFFLINE
        username: 'AdityaSetyadi', //
        formMode: 1, // 1 => OPEN ; 2 => REJECTED ; 3 => SUBMITTED ; 4 => APPROVED ;
        initialMode: 2 // 1=> INITIAL ; 2 => ASSIGN
      }

      var responseGear = null;
      var mediaGear = null;
      var remarkGear = null;
      var principalGear = null;
      var referenceGear = null;

      const setBearer = () => {
        return ({
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        })
      }

      let uploadHandler = function (setter: any) {
        // console.log('camera handler', setter);
        // cameraFunction = setter;
        // openCamera();
      }



      let offlineSearch = function (id: any, version: any, dataJson: any, setter: any) {

        let condition = JSON.stringify(dataJson)

        //here we use jquery to retrieve data from the local device
        //@ts-ignore
        $.ajax({
          url: `http://localhost:9090/lookup?id=${id}&v=${version}&c=${condition}`,//specify localhost endpoint to fetch
          type: "GET",
          crossDomain: true,
          dataType: "json",
          data: null,
          success: function (d: any) {
            console.log(d.hasil)
            setter(d)

          },
          error: function (XMLHttpRequest: any, textStatus: any, errorThrown: any) {

          }
        });

      }

      let GpsHandler = function (setter: any, isPhoto: any) {
        // console.log('camera handler', setter);
        // isPhoto = true,
        // cameraGPSFunction = setter;
        // openCameraGPS(isPhoto);
      }

      //custom function to trigger setResponsMobile to run from outside form-gear, you can custom the function name
      let mobileExit = (fun: any) => {
        // fun()
      }

      let onlineSearch = async (url: any) =>
      (await fetch(url, setBearer())
        .catch((error: any) => {
          return {
            success: false,
            data: {},
            message: '500'
          }
        }).then((res: any) => {
          if (res.status === 200) {
            let temp = res.json();
            return temp;
          } else {
            return {
              success: false,
              data: {},
              message: res.status
            }
          }
        }).then((res: any) => {
          return res;
        }
        ));

      let setResponseMobile = function (res: any, med: any, rem: any, princ: any, ref: any) {
        // responseGear = res
        // mediaGear = med
        // remarkGear = rem
        // principalGear = princ
        // referenceGear = ref

        // console.log('----------', new Date(), '----------');

        // console.log('response', responseGear)
        // console.log('media', mediaGear)
        // console.log('remark', remarkGear)
        // console.log('principal', principalGear)
        // console.log('reference', referenceGear)
      }

      let setSubmitMobile = function (res: any, med: any, rem: any, princ: any, ref: any) {
        // responseGear = res
        // mediaGear = med
        // remarkGear = rem
        // principalGear = princ
        // referenceGear = ref

        // console.log('----------', new Date(), '----------');

        // console.log('response', responseGear)
        // console.log('media', mediaGear)
        // console.log('remark', remarkGear)
        // console.log('principal', principalGear)
        // console.log('reference', referenceGear)
      }

      let openMap = function (koordinat: any) {
        // koordinat = koordinat

        // console.log('coordinat ', koordinat)
      }

      let form = FormGear(reference, template, preset, response, validation, media, remark, config, uploadHandler, GpsHandler, offlineSearch, onlineSearch, mobileExit, setResponseMobile, setSubmitMobile, openMap);
      return form;
    }

    const data = Promise.all([
      reference, template, preset, response, validation, media, remark
    ]);

    data.then(([reference, template, preset, response, validation, media, remark]) =>
      initForm(reference, template, preset, response, validation, media, remark));

  }

}
