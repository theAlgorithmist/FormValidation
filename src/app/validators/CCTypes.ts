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
 * Credit Card Types - this is a basic starting list to build upon
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

 export class CCTypes 
 {
   public static NONE                     : string = "none";
   public static AMERICAN_EXPRESS         : string = "amex";
   public static DISCOVER                 : string = "disc";
   public static DINERS_CLUB_INTERNATIONAL: string = "dine";
   public static VISA                     : string = "visa";
   public static MASTERCARD               : string = "mast";

   constructor()
   {
     // empty
   }

   public static isAccepted(cardName:string): boolean
   {
     return cardName == this.AMERICAN_EXPRESS          ||
            cardName == this.DISCOVER                  ||
            cardName == this.DINERS_CLUB_INTERNATIONAL ||
            cardName == this.VISA                      ||
            cardName == this.MASTERCARD;
   }
 }