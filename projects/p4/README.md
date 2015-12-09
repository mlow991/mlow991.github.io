# Project 6: Feed Reader Testing with Jasmine
For this project I was given an unfinished application to write a comprehensive test suite for various features.  Completion of this project ultimately prepares me for practicing the standard of "test-driven development."  In this project I write tests that are required of me, and also include a few of my own tests for future feature implementations for the RSS feed reader app.  (Say that last sentence 5 times fast).

## How to run this application
This application can be run from your local machine.  Simply download the zip file or clone the repository onto your computer.  Jasmine is already installed within the project directory, as is jQuery and handlebars which are loaded from CDNs.

## Tests for extra features
I've added tests for two extra features for this application that have yet to be implemented.  The purpose of this is to showcase a key component of test-driven development; the tests have been written before the features have been implemented.  The two features are the following:

1.	A Delete Feed feature
	* Each feed item in the menu will have an 'x' button that allows for the instant deletion of the feed from the menu.
	* Jasmine tests will do the following:
		1.	Make sure that each menu item and 'x' button pair have the same identifying index.  This test will currently fail because the delete buttons do not currently exist.
		2.	Make sure that the correct element is deleted from the list menu.  This test will currently fail because the delete function has not been written yet.
2.	A color scheme changer
	* The color scheme of the App is currently set to green.  A color scheme button, when clicked, will call the changeColor function which will change the color to red.
	* Jasmine test will do the following:
		1.	Make sure that the color for the menu and the header have both been changed to the specified color.  The specified color is hard-coded in the app.js.  This test will currently fail because the color change function has not been written yet.

## What did I learn?

I learned how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.


## How will this help my career?

* Writing effective tests requires analyzing multiple aspects of an application including the HTML, CSS and JavaScript - an extremely important skill when changing teams or joining a new company.
* Good tests give you the ability to quickly analyze whether new code breaks an existing feature within your codebase, without having to manually test all of the functionality.