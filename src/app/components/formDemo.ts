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
 * Custom Angular 2 Form Validation Demo (w/Typescript Math Toolkit cutom validators)
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
 import { Component           } from 'angular2/core';
 import { FORM_DIRECTIVES, 
          ControlGroup, 
          AbstractControl,
          FormBuilder,
          Validators          } from 'angular2/common';

 // check form input properties as the user types
 import { PasswordStrength    } from '../validators/PasswordStrength';
 import { CCValidator         } from '../validators/CCValidator';
 import { CCTypes             } from '../validators/CCTypes';

 // custom validators
 import { nameValidator       } from '../validators/NameValidator';
 import { emailValidator      } from '../validators/EmailValidator';
 import { passwordValidator   } from '../validators/PasswordValidator';
 import { creditCardValidator } from '../validators/CreditCardValidator';
 import { expireValidator     } from '../validators/ExpireValidator';

 @Component(
 {
   selector: 'form-demo',

   templateUrl: '/app/templates/main.html',

   directives: [FORM_DIRECTIVES]

 })

 // This is the main component for the A2 forms demo
 export class FormDemoComponent 
 {
   private _accountForm: ControlGroup;  // Form Control Group

   private _selectedCard: string;       // selected card name, i.e. AMEX, MASTERCARD, etc.
   private _passStrength: string;       // password strength indication, i.e. 'good', 'strong', etc.
   private _showPasswordTxt: string;    // show or hide password text
   private _passInputType: string;      // type attibute, 'text' or 'password'
   private _showPassword: boolean;      // true if showing password, false if hiding it
   private _passStrengthVal: number;    // password strength (0-100)
   private _color: string;              // hex color code associated with password 
   private _ccImgSrc: string;           // img 'src' attribute to dynamically switch the credit-card image based on the computed card type
  
   // form controls
   private _name: AbstractControl;      // user's full name
   private _email: AbstractControl;     // user's email address
   private _password: AbstractControl;  // user's account password
   private _remember: AbstractControl;  // 'remember me'
   private _credit: AbstractControl;    // credit card number
   private _expire: AbstractControl;    // expiration date

  /**
   * Create a demo component
   *
   * @param passwordStrenthIndicator: Injected password strength indicator to measure password strength as user types
   *
   * @param formbuilder: FormBuiler - Injected form builder 
   *
   * @return nothing This is the root component of the demo. 
   */
   constructor(private _passwordStrengthIndicator: PasswordStrength, private _formBuilder: FormBuilder)
   {
     this._selectedCard    = "Card: NONE";
     this._passStrength    = "Strength: None"
     this._showPasswordTxt = "Show Password"; 
     this._passInputType   = "password";
     this._showPassword    = false;
     this._passStrengthVal = 0;
     this._color           = "#ffffff";
     this._ccImgSrc        = "assets/creditcard.png";

     this._accountForm = _formBuilder.group({
       '_name'    : ['', Validators.compose([Validators.required, nameValidator])      ],
       '_email'   : ['', Validators.compose([Validators.required, emailValidator])     ],
       '_password': ['', Validators.compose([Validators.required, passwordValidator])  ],
       '_remember': [''],
       '_credit'  : ['', Validators.compose([Validators.required, creditCardValidator])],
       '_expire'  : ['', Validators.compose([Validators.required, expireValidator])    ]
     });

     this._name     = this._accountForm.controls['_name'    ];
     this._email    = this._accountForm.controls['_email'   ];
     this._password = this._accountForm.controls['_password'];
     this._remember = this._accountForm.controls['_remember'];
     this._credit   = this._accountForm.controls['_credit'  ];
     this._expire   = this._accountForm.controls['_expire'  ];
   }

   // handle form submission
   private __onAccountFormSubmit(value:Object):void
   {
     if( this._accountForm.valid ) 
     {
       console.log("FORM SUBMISSION\n");

       console.log( "Name       : ", this._name.value              );
       console.log( "Email      : ", this._email.value             );
       console.log( "Passowrd   : ", this._password.value          );
       console.log( "Remember Me: ", this._remember.value === true );
       console.log( "Credit Card: ", this._credit.value            );
       console.log( "Expires    : ", this._expire.value            );  // the form allows different formats, so may want to clean this up
     }
   }

   // toggle show-password link and the type attribute of the password input field
   private __onShowPassword():void
   {
     this._showPassword = !this._showPassword;

     if( this._showPassword )
     {
       this._showPasswordTxt = "Hide Password";
       this._passInputType   = "text";
     }
     else 
     {
       this._showPasswordTxt = "Show Password";
       this._passInputType   = "password";
     }
   }

   // evaluate password strength on key-up
   private __onPasswordKeyUp(): void
   {
     this._passStrengthVal = this._passwordStrengthIndicator.measure(this._password.value);

     if( this._passStrengthVal == 0 ) 
     {
       this._passStrength = "Strength: None";
       this._color        = "#ffffff";
     }
     else if( this._passStrengthVal <= 20 ) 
     {
       this._passStrength = "Strength: Weak";
       this._color        = "#EEB4B4";
     }
     else if( this._passStrengthVal <= 40 ) 
     {
       this._passStrength = "Strength: Better";
       this._color        = "#FFF8DC";
     }
     else if( this._passStrengthVal <= 65 ) 
     {
       this._passStrength = "Strength: Good";
       this._color = "#E8F1D4";
     }
     else if( this._passStrengthVal <= 90 ) 
     {
       this._passStrength = "Strength: Very Good";
       this._color        = "#D4ED91";
     }
     else 
     {
       this._passStrength = "The Force is strong with this one";
       this._color        = "#ADFF2F";
     }
   }

   // evaluate credit-card type as the user types
   private __onCCKeyUp(): void
   {
     var cardType: string = CCValidator.getCardType( this._credit.value.toString() );

     switch (cardType)
     {
       case CCTypes.AMERICAN_EXPRESS:
         this._ccImgSrc     = "assets/amex.png";
         this._selectedCard = "American Express";
       break;

       case CCTypes.DISCOVER:
         this._ccImgSrc     = "assets/discover.png";
         this._selectedCard = "Discover";
       break;

       case CCTypes.MASTERCARD:
         this._ccImgSrc     = "assets/mastercard.png";
         this._selectedCard = "Mastercard";
       break;

       case CCTypes.VISA:
         this._ccImgSrc     = "assets/visa.png";
         this._selectedCard = "Visa";
       break;

       case CCTypes.NONE:
         this._ccImgSrc     = "assets/creditcard.png";
         this._selectedCard = "None";
       break;
     }
   }
 }