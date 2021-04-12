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

## Set Creation Test 1

Ensure user can create word sets.

* Fill out required information for creating a set
* Select existing words from the current users dictionary
* Click submit
* Upon viewing the user's profile, that new set should be visible with the selected words as members of the set.

## Set Creation Test 2

Ensure user can create a new word in set creation page.

* Create a word using the word creation page adding all of the required fields.
* Check the existing set in the list of sets.
* Click submit.
* Word should now exist as a member of that set.

## Set Creation Test 3

Ensure user can create empty sets.

* Enter the required descriptive fields of a set in the set creation form.
* Do not add any words to the set.
* Click Submit.
* Be shown a warning that the set should have words.

## Word Addition Test

Ensure that a word can be successfully created by a user.

* Enter required information in the word creation form.
* Click Submit
* Word should now exist as a member of the dictionary for the language that is currently selected.

## Flashcards Test 1

Ensule that flash cards flip.

* Select flashcard settings to open a set up in the flash cards mode.
* Upon clicking the flashcard, the flipping animation should trigger, and the opposite word should be shown (the foreign language equivalent if the English word was displayed on the front)

## Flashcards Test 2

Ensure flash cards change when change card arrow is selected.

* Select flashcard settings to open a set up in the flash cards mode.
* Upon clicking on the right arrow, the information on the card should change to the next word in the set.

## User Dictionary Test 1

Ensure user can edit words in their dictionary

* Upon clicking the 3 vertical dot menu on an entry in the user dictionary page, an "edit" option should be available to be clicked.
* Edit the desired element to have any changed information desired and submit.

## User Dictionary Test 2

Ensure user can delete words from their dictionary.

* Upon clicking the 3 vertical dot menu on an entry in the user dictionary page, an "delete" option should be available to be clicked.
* Upon pressing that, the user should be removed from that dictionary.

## Pronunciation Practice Test 1

Ensure successful result is returned from pronunciation API with valid input.

* Open the pronunciation practice activity with a set.
* Correctly speak the given word after clicking the microphone icon.
* The application will display that you were successful in pronouncing the word.

## Pronunciation Practice Test 2

Ensure unsuccessful result is returned from pronunciation API with valid input.

* Open the pronunciation practice activity with a set.
* Incorrectly speak the given word after clicking the microphone icon.
* The application will display that you were unsuccessful in pronouncing the word.

## Spelling Practice Test 1

Ensure spelling game returns successful result when vocabulary word is spelled correctly.

* Open the spelling practice activity with a set.
* Correctly spell the given word's foreign language counterpart and click next.
* The application should display that you were successful in spelling the word.

## Spelling Practice Test 2

Ensure spelling game returns an unsuccessful result when vocabulary word is spelled incorrectly.

* Open the spelling practice activity with a set.
* Incorrectly spell the given word's foreign language counterpart and click next.
* The application should display that you were unsuccessful in spelling the word.
