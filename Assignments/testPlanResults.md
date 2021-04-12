# Test Plan Results

## User Creation Test 1

Ensure user can create account using site UI.

* Correctly fill out all of the mandatory information manually.
* Click Submit
* Be taken to the home page of ULang.

## User Creation Test 2

Ensure proper behavior of User Creation API.

* Correctly fill out all of the mandatory information in the sign up form.
* Click submit
* Be taken to the home page of ULang.
* Check the Mongo database for a user with an email and username matching what was submitted and a creation date of the same time as the request was sent.

## User Creation Test 3

Ensure graceful failure and error handling when given invalid information for User Creation.

* Fill out username with invalid characters, a password, and confirm the password.
* Fill out the rest of the input forms with valid info.
* Click submit
* See error message below the username input box saying it contains invalid characters.

## User Creation Test 4

Ensure graceful failure and error handling when given invalid information for User Creation.

* Fill out the input form with a valid password and confirm the password with a password containing a different string.
* See error message below the confirm password input box saying that the passwords do not match.

## User Login Test 1

Ensure user can log in with previously created account.

* Fill out the input form with a valid username and the matching password.
* Click submit
* See the homepage of ULang with any existing information available on the homepage.

## User Login Test 2

Ensure proper behavior of User Login API.

* Fill out the input form with a valid username and the matching password.
* Click submit
* See the homepage of ULang with any existing information available on the homepage.
* Check MongoDB to ensure that the username of that account does exist in the database.
* Check Network Dev Tools in the browser to ensure that the API query was successful.

## User Login Test 3

Ensure graceful failure and error handling when given invalid information for User login.

* Fill in username containing invalid characters and correct password.
* Click submit
* Login form should not submit and should show that the username contains invalid characters
