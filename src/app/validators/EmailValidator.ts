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
 * Custom Angular 2 Email validator - this is not complete, but should be a good starting point for a production app.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { Control } from 'angular2/common';


// returns a specific Object signature that is akin to a String Map (think typedef from C++) with a string key and a boolean value
export function emailValidator(control: Control): { [s: string]: boolean } 
{
  var email: string = <string>control.value;
  if( email && email != "" && email != " " )
  {
    // check for '@ and .'
    if( email.indexOf('.') == -1 || email.indexOf('@') == -1 )
      return { 'invalidFormat': true };

    // rudimentary domain check - needs to be beefed up for production use
    if( !isValidEmail(email, ".com,.edu,.net,.org,.biz,.gov,.mil,.io,.me,.tv") )
      return { 'invalidDomain': true };
  }
}

export function isValidEmail(email: string, domains:string): boolean
{
  var dom:Array<string> = domains.split(",");
  var len: number       = dom.length;
  var i: number;
  var d: string;

  for( i=0; i<len; ++i ) 
  {
    d = dom[i];
    if (email.indexOf(d) != -1)
      return true;
  }

  return false;
};