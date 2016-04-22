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
 * Custom Angular 2 password validator - length and min required chars only
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { Control } from 'angular2/common';


// returns a specific Object signature that is akin to a String Map (think typedef from C++) with a string key and a boolean value
export function passwordValidator( control: Control ): { [s: string]: boolean } 
{
  if( control.value.length > 0 ) 
  {
    // length test
    var pass: string = control.value;
    if( !pass || pass.length < 8 )
      return { 'invalidLength': true };

    // at least one number
    if( !pass.match(/[0-9]/) )
      return { 'minNumber': true };

    // at least one upper/lower char
    if( !pass.match(/[a-zA-Z]/) )
      return { 'minChar': true };

    // at least one special character
    if( !pass.match(/[!,%,&,@,#,$,^,*,?,_,~]/) )
      return { 'specialChar': true };
  }
}