# Project Constraints

## Economic Cost

* Cloud Hosting
  * Constant cost when running.
  * Mitigated during development by free hosting time given to students.
* Domain Name
  * Constant cost once deployed.
* Potential Cost
  * Depending on what Natural Language processing API is used there may be a cost per call.
  * Mitigated by a limited number of free calls for students.

## Time

* Semester Constraint
  * Hard cutoff. Eliminates possibility of delaying deployment.
  * Manageable according to our timeline
* Competing With Other Responsibilities
  * Other classes.
  * Work.
  * Extra Curriculars.

## Scope

* Scope of Project
  * Defined in task List
  * Set hard boundary at an amount of work achievable within the time constraint
* Scope of Team Memeber Contributions
  * Defined in Effort Matrix
  * Limits memebers to a reasonable share of the work

## Technical Expertise

* Elegant Database Design
  * Need to be able to design our database in a way that allows for easy access to all CRUD operations that will be needed without bugs.
  * Need to select the correct database paradigm for our use case and to accommodate for possible additions to the schema later, if anticipated.
* Knowledge of Foreign Languages' Rules
  * Need to know the general structure of the Latin and Germanic-based languages we plan to support in order to properly support note taking.
* Natural Language Precessing
  * Speech Capture
    * Need knowledge of a library that will help us to capture speech from a microphone on our application.
  * Interpretation
    * Need knowledge of a library that will help us interpret what the user is saying in the language that they are speaking to be able to compare it to what they are expected to be able to say.
  * API Querying
    * Need an knowledge of how to use public APIs exposed by companyies like Google for language processing, etc.

## Ethical & Legal

* Data Privacy
  * Voice Audio
    * We won't be saving voice audio long term.
  * Email / Passwords
    * We won't be selling any emails collected and will store only hashed passwords in our database to keep user information safe.
  * Account Info
    * Account information can be updated at any time, deleted at any time, and it will be made clear whether information is publically available.
* Transparency
  * Where data is sent e.g. Google APIs
    * This information will be made publically available to the users.
  * How data is stored and used
    * Will make it clear what information provided by the user is being used in the application.

## Security

* Secure Data Storage
  * Storage of passwords and emails of user accounts is a priority to keep user information private.
* Secure Audio Data
  * When recording audio for analysis, audio needs to be encrypted in order to protect users privacy.
* Secure Communications
  * All communication between connected services (web, backend, APIs) needs to be protected via means like HTTPS and authentication tokens

## Social

* Intended for public use
  * Since the application will be available for all people to use, the UI must be held to high usability standards

## Diversity & Cultural

* English as Base Language
  * The application is intended for a userbase that are English speakers as their primary language. The UI will be in English.
* Only Support Latin/Germanic Languages
  * The tools in the app will only support Latin and Germanic based languages, i.e., French, Spanish, German.
