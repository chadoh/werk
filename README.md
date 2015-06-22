# Chad's Toptal Project

This is a project for Phase 3 of Chad's Toptal interview process.

## Project description

Write a simple time management system.

* User must be able to create an account and log in
* User can add (and edit and delete) a row what he has worked on, what date,
  for how long
* User can add a setting "Preferred working hours per day"
* If on a certain date a user has worked under the PreferredWorkingHourPerDay,
  these rows are red, otherwise green.
* Implement at least two roles with different permission levels (ie: a regular
  user would only be able to CRUD on his owned records, a user manager would be
  able to CRUD users, an admin would be able to CRUD on all records and users,
  etc.)
* Filter entries by date from-to
* Export the filtered times to a sheet in HTML:
  * Date: 21.5
  * Total time: 9h
  * Notes:
  * Note1
  * Note2
  * Note3
* REST API. Make it possible to perform all user actions via the API, including
  authentication (If a mobile application and you don’t know how to create your
  own backend you can use Parse.com, Firebase.com or similar services to create
  the API).
* In any case you should be able to explain how a REST API works and
  demonstrate that by creating functional tests that use the REST Layer
  directly.
* All actions need to be done client side using AJAX, refreshing the page is
  not acceptable. (If a mobile app, disregard this)
* Bonus: unit tests!
* You will not be marked on graphic design, however, do try to keep it as tidy
  as possible.

NOTE: Please keep in mind that this is the project that will be used to
evaluate your skills. The project will be evaluated as if you are delivering it
to a customer. We expect you to make sure that the app is fully functional and
doesn’t have any obvious missing pieces. The deadline for the project is
2 weeks from today.

## Approach

I am building the API layer with Rails (rails-api, specifically) and the UI
layer with React and Flux. For simplicity, I'm including each of these projects
as directories within this single repo. Ideally, I'd like to have them each in
their own, though.

Both repos are to be deployed separately. The UI layer, if we don't need
isomorphism (view rendering on the server), could be deployed entirely on AWS
S3, and cached with Amazon Cloudfront. That would make downloading of the
assets happen nice and fast!
