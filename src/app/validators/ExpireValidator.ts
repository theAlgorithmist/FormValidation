/** 
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Custom Angular 2 credit card expiration validator - this validator determines if the expiration date is of the proper form, i.e. mm/yy (although it 
 * will allow mm-yy, mmyy, or mm yy) and that the month/year is ahead or equal to the current month/year
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
 import { Control     } from 'angular2/common';
 import { CCValidator } from './CCValidator';

 // returns a specific Object signature that is akin to a String Map (think typedef from C++) with a string key and a boolean value
 export function expireValidator( control: Control ): { [s: string]: boolean } 
 {
   var expire: string = control.value;
   var month: string  = "00";
   var year: string   = "00";

   if( expire.length > 0 ) 
   {
     // length test
     if( expire.length < 4 )
       return { 'minLength': true };

     if( expire.length == 4 ) 
     {
       month = expire.substr(0, 2);
       year  = expire.substr(2, 2);
     }
     else if (expire.length == 5) 
     {
       month = expire.substr(0, 2);
       year  = expire.substr(3, 2);
     }

     if( !isExpireValid(month, year) )
       return { 'invalid': true };
   }
 }

 export function isExpireValid(month: string, year: string): boolean
 {
   var m: number = parseInt(month);
   var y: number = parseInt(year);

   if( isNaN(m) || isNaN(y) )
     return false;

   if( m < 1 || m > 12 )
     return false;

   if( y < 0 || y > 99 )
     return false;

   var date: Date       = new Date();
   var curMonth: number = date.getMonth();
   var curYear: number  = parseInt( date.getFullYear().toString().substr(2, 2) );
   
   if( y < curYear )
     return false;
   else if( y == curYear )
     return m >= curMonth;
   else
     return true;
 }