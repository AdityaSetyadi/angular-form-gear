import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FormGear } from 'form-gear';
import '../../node_modules/form-gear/dist/style.css';
import template  from '../data/template.json'
import preset  from '../data/preset.json'
import response  from '../data/response.json'
import validation  from '../data/validation.json'
import remark  from '../data/remark.json'

// const gear = require('form-gear');
// const { FormGear } = gear;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  
  constructor() { }
  
  async ngOnInit() {

    function initForm(template:any, preset:any, response:any, validation:any, remark:any){
      
      let config = {
        clientMode: 1, // CAWI = 1, CAPI = 2
        token: `aeyJ0eXA`,
        baseUrl: `https://api-survey.bps.go.id/designer/api/lookup-data/json`,
        lookupKey: `key%5B%5D`,
        lookupValue: `value%5B%5D`,
        username: 'AdityaSetyadi',
        formMode: 1 // 1 => OPEN ; 2 => REJECTED ; 3 => SUBMITTED ; 4 => APPROVED ;  
      }
      

      const setBearer = () => {
        return ({
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + config.token
          }
        })
      }

      let uploadHandler = function (setter:any) {
        // console.log('camera handler', setter);
        // cameraFunction = setter;
        // openCamera();
      }

      let GpsHandler = function (setter:any, isPhoto:any) {
        // console.log('camera handler', setter);
        // isPhoto = true,
        // cameraGPSFunction = setter;
        // openCameraGPS(isPhoto);
      }

      let onlineSearch = async (url:any) =>
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

      let setResponseMobile = function (res:any, rem:any) {
        // respons = res
        // remarks = rem

        // console.log('respons', respons)
        // console.log('remarks', remarks)
      }

      let setSubmitMobile = function (res:any, rem:any) {
        // respons = res
        // remarks = rem

        // console.log('respons submit', respons)
        // console.log('remarks submit', remarks)
      }

      let openMap = function (koordinat:any) {
        // koordinat = koordinat

        // console.log('coordinat ', koordinat)
      }

      let form = FormGear(template, preset, response, validation, remark, config, uploadHandler, GpsHandler, onlineSearch, setResponseMobile, setSubmitMobile, openMap);

      return form;
    }
    
    const data = Promise.all([
      template, preset, response, validation, remark
    ]);
    
    data.then(([template, preset, response, validation, remark]) => 
    initForm(template, preset, response, validation, remark));

  }
  
}
