# Angular 2/Typescript Math Toolkit Advanced Form Validation Demo

This demo exercises several Typescript Math Toolkit custom form validators for Angular 2.  These custom validators serve as a base to build your own application-specific form validators and cover everything from basic customer name to credit-card number validation.  The latter, of course, does not determine if a card is valid to be charged; it simply identifies the type of credit card and whether or not the number is a properly-generated credit-card number.  This is where a bit of math (Luhn's algorithm) comes into play.  After all, you did not expect to see a demo without some math involved, right?  And, speaking of math, there is a bit more for you in the real-time password-strength indicator :)

The html template used in this demo is the most complex of any of the other demos provided to date as it illustrates production-quality features for form display/validation.  The actual form, however, is hypothetical.

The validation strategy is essentially validate-as-you-type.  As the user types information into a field, that information is validated in real-time.  The user recevies feedback on what is necessary to properly complete each form entry below that form input.  Each message varies based on the requested information and the custom validator.  

Each custom validator returns results that can be direct-wired into the template and messages are revealed using _*ngIf_.  Success or failure for each field is indicated through the use of Bootstrap classes that are dynamically switched in the template.  You could, of course, use Semantic UI or your own custom CSS.  So, if the user fails to properly fill out one field and then tabs to the next field, the incorrect field is highlighted in a reddish color and the relevant error message is displayed underneath.  If that field is properly filled out, it is highlighted in a greenish color when the user moves onto the next input.  The overall validity of the form is dynamically displayed at the bottom of the UI.

Once the form data is submitted, the results from each control are written to the console.  

Some of the demo features include

```sh
$ Dynamically switch Bootstrap classes based on control validity
$ Create custom validators in Typescript (alpha TSMT validators are used as an example)
$ Compose custom valildators with Angular-supplied validators
$ Use *ngIf in tandem with validator return info. to display real-time error or hint messages to aid in form completion
$ Illustrate a show/hide password facility with binding applied to input type attribute and anchor text
$ Illustrate how to implement a real-time password strength indicator with animated color display
$ Show how to validate credit-card numbers for theoretical accuracy
$ Show how to determine the type of credit card and dynamically display an image of that card type
$ Processing of all form controls on submission
```

The application is built in 'dev' mode only.  If you are interested in creating production (bundled) A2 applications without use of a third-party bundler, then the [statistical analysis of tabular data] demo should be of interest.

Note that while the demo uses classes from the Typescript Math Toolkit, the entire library is not included with the source distribution.  Each class used in the demo was manually moved out of the TSMT and placed in the *src/lib* folder.

Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular 2: Beta 14

## Installation

Installation involves all the usual suspects

  - npm and gulp installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)

## Introduction

The goals of this demo are 

* Illustrate usage of Typescript Math Toolkit computational classes in an actual application setting
* Add to the body of knowledge on how to create and run Angular 2/Typescript applications
* Show how to implement complex, custom form validators in Angular 2, how to use FormBuilder, and how to access Controls
* Show to do implement validate-as-you-type in an Angular 2 form
* Provide a base for real-time form indicators such as password strength
* Create an excuse for another cup of coffee

I hope that you find something instructive from the code and are interested in improving the demo in some way.

### Version
1.0.0

### Building and Running the demo

All source files are provided in a *src* folder.  Gulp is used to build and run the demo.  Available development and tasks are summarized below.

```sh
$ gulp clean (deletes everything in the dev folder)
$ gulp copy:html (copies the index.html file from /src to /dev)
$ gulp copy:templates (copies all angular 2 templates files into dev folder)
$ gulp copy:css (copies all css files into dev folder - you can add a build step if you like SaSS)
$ gulp copy:assets (copies all visual assets into dev folder)
$ gulp copy:framework (copies all Angular 2 framework files into appropriate location - should only need to be done once)
$ gulp tslint (lints all Typescript files in the source)
$ gulp compile (compiles all src .ts files and places them in the appropriate build location)
$ gulp serve (launch a browser and run the application while watching for file changes)
$ gulp copy:all (copies everything except the framework files)
$ gulp build:all (build a complete, ready-to-run application)
```

After installing the demo, execute _gulp build:all_ to create a ready-to-run application in the *dev* folder.  Execute _gulp serve_ to serve up the application and run the debug version of the demo.  After loading, enter information into the form fields.

![Image of Form Demo]
(http://algorithmist.net/image/form.png)

Notice that inputs prior to the credit card number are properly filled out.  The Bootsrap _has-success_ class is applied to those controls.  The credit card is identified as a Mastercard, but the number is not properly formatted.  This is computed using both a length check and Luhn's algorithm with (alpha) code from the Typescript Math Toolkit.  The specific error is displayed below the form input and the field is displayed with the Boostrap _has-error_ class.

Also, please note that only a few credit cards are 'accepted' by the merchant in this demo.  The form itself is hypothetical and would be considered incomplete in a production context.  For example, there is no input for a CVV number.  Please consider this as one possibility for modifying and enhancing the demo. 

After executing the build step, you need only apply the specific task needed for any modifications, and modification is recommended :)

The demo has been tested in late-model Chrome on a Mac. 


### Contributions

Contributions and coffee are highly encouraged as I believe the best demo is one that allows ample room for improvement. Regex, for example, is not my strong suit.  There is room for improvement in the valildators and someone may be interested in adding support for more credit cards that are accepted in the demo.

Unless it is a very tiny mod or bug fix, please place your complete source in a new folder, i.e. 'using-jspm' or 'new-framework'.  Submit pull requests to theAlgorithmist [at] gmail [dot] com.


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <https://www.linkedin.com/in/jimarmstrong>
[statistical analysis of tabular data]: <https://github.com/theAlgorithmist/Table>
