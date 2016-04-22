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
 * Custom Angular 2 Name validator for first and last name only.  This does allow a first and last name of only a single character, for
 * example.  So, use this as a base to build upon.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { Control } from 'angular2/common';


// returns a specific Object signature that is akin to a String Map (think typedef from C++) with a string key and a boolean value
export function nameValidator( control: Control ): { [s: string]: boolean } 
{
  if( control.value.length > 0 ) 
  {
    // first and last name only?
    var elements: Array<string> = control.value.split(" ");
    if (!elements || elements.length == 0)
      return { 'nameRequired': true };

    if( elements.length != 2 )
      return { 'lengthInvalid': true };

    // letters only
    if( !elements[0].match(/[a-zA-Z]/) )
      return { 'invalidChars': true };

    if( elements[1].length > 0 )
    {
      if( !elements[1].match(/[a-zA-Z]/) )
        return { 'invalidChars': true };
    }
  }
}