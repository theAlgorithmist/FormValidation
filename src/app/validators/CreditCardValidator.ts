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
 * Custom Angular 2 credit card validator - determines if the card number is of a suitable, minimum length and passes the
 * luhn algorithm test.  This does not mean the card is valid to charge against.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
 import { Control     } from 'angular2/common';
 import { CCValidator } from './CCValidator';

 // returns a specific Object signature that is akin to a String Map (think typedef from C++) with a string key and a boolean value
 export function creditCardValidator( control: Control ): { [s: string]: boolean } 
 {
   var card: string = control.value.toString();
   if( card.length > 0 ) 
   {
     // length test
     if( card.length < CCValidator.MIN_LENGTH )
       return { 'minLength': true };

     // general validation test
     if( !CCValidator.isValid(card) )
       return { 'invalid': true };
   }
 }