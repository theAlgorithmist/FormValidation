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
 * A password stength indicator.  Minimum 8 characters, one capital, one lowercase letter.  Extend the class and override the measure method
 * to support other strategies.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
 export class PasswordStrength
 {
   // password categories that are graded - these are stored as class variables in case access is required in the future
   private _characters: number = 0;
   private _capitals: number   = 0;
   private _lower: number      = 0;
   private _number: number     = 0;
   private _special: number    = 0;

   // FUR (Frequently used RegEx)
   private _upperCase: RegExp;
   private _lowerCase: RegExp;
   private _numbers: RegExp;
   private _specialchars: RegExp;

   constructor(  )
   {
     this._upperCase    = new RegExp('[A-Z]');
     this._lowerCase    = new RegExp('[a-z]');
     this._numbers      = new RegExp('[0-9]');
     this._specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');
   }

  /**
   * Measure the strength of the supplied password on a scale of 0-10 
   *
   * @param password: string - String representing a candicate password
   *
   * @return number - Zero if the minimum numer of characters has not been entered.  1-100 denotes varying levels of strength with 100 being the best
   * possible.
   */
   public measure(password: string): number
   {
     this._characters = 0;
     this._capitals   = 0;
     this._lower      = 0;
     this._number     = 0;
     this._special    = 0;

     // total score
     var total: number = 0;
     var len: number   = password.length;

     // character length score
     if( len >= 8 ) 
     {
       if( len >= 16 )
         this._characters = 3;
       else if( len >= 12 )
         this._characters = 2;
       else
         this._characters = 1;
     }

     // capital letters score
     this._capitals = password.match(this._upperCase) ? 1 : 0;
     
     // lowercase letters score
     this._lower = password.match(this._lowerCase) ? 1 : 0;

     // number score
     this._number = password.match(this._numbers) ? 1 : 0;

     // special characters score
     this._special = password.match(this._specialchars) ? 1 : 0;

     // total the score - best possible is 7 in this simple example.  This leaves lots of room for enhancements
     var total: number   = !password.length ? 0 : this._characters + this._capitals + this._lower + this._number + this._special;

     // return percentage in [0,100]
     return Math.round((total / 7) * 100);
   }
 }