# Description
This repository contains tests for Ezra's take-home assessment. This later portion of this `README.md` file contains the necessary information for the automated tests.

Answers to Questions 1 and 2 of the assessment can be found in the [`answers.md`](answers.md) file in the root directory.

## Explanations
One of the assumptions made while creating this automation project is that working tests are of most value. Because of this assumption, some decisions were made, like hard-coding some objects when UI elements were difficult to identify. The trade-off for this is that it increases the level of maintenance - if the identifier changes, then the test(s) will need to be updated. This will be discussed later in this document under **Identifying UI elements** in the **Scheduling a Service** section.

### Project structure
This project is structured using the Page-Object Model (POM) for maintainability and scaleability. The project follows the general principles of POM in terms of structure, however, there were some decisions made that strayed from it due to the priorization of getting the tests working for the assessment. Those decisions will be discussed below but are also noted in the codebase.

The basic structure of the project is to store all the tests, or `*.spec.ts` files in the `tests` directory and further organize the tests inside that directory. For the purposes of demonstration, I created two directories,`member-portal` and `user-portal` to show how testts may be organized. Obviously, for this assessment, only two tests were created, both under the `member-portal`, so I just created one test file for simplicity; however, when building out this project, it would probably be more effective to break down the tests into groups by workflows or functional areas (i.e. packages, member mangagement, scheduling, etc..). 

The project also contains a `support` directory, which holds all the page-objects and the appropriate methods used in the tests. Similarly to the `tests` directory, files are organized by `member-portal` and `user-portal`. For UI tests, I have, gneerally, found it easier and more effective to organize these by screens in the UI; however, I am definitely open to other structures and decisions. Inside the `support` directory, I also created a `shared` directory inside each application directory where I store common page objects that are *specific* to that application (i.e. logging in, navigation options, etc...). There is also a `shared` directory under `support` for more general "shared methods" (clicking a link or button, etc..). 

I have also included a `helpers` directory which contains helper methods for the project. In this case, the `memberHelper.ts` contains a method that helps generate user data for member sign ups. In other projects, I have used this to create helper methods that generate auth tokens, random numbers and dates, and grabbed values from an API response, for example.

The `.env` file is used to store environment variables. This file holds data that will not be pushed into the repository. However, the `.env.example` file can be used to create the `.env` file for those pulling down this project. The `.env` should never be pushed into the repository. To help prevent accidental commits and pushes, this file can be added to the `.gitignore` file.

The `.globals.ts` file stores all global variables so they are accessible by all parts of the project, as necessary. 

## Selected tests
The tests I chose to automate were:
1. Member sign up.
2. Scheduling a service.

I chose these primarily because, from a value perspective, they are two with the highest value to the business. 

### Member sign up
This test demostrates the ability for a member to sign up. Pretty simple. However, from a technical perspective, I wanted to show the ability to utilize tools like `fakerjs` to generate random test data so that the test data can be diverse. 

### Scheduling a service
This seems like a very high-value workflow for the business so from just a general testing perspective, that in-it-of-itself, dictates to me that it needs to be a part of the automated regressions suite.

I also wanted to ensure that all the appropriate options (any MRI Scan, Lung Scan, Heart Scan) were available to be selected and the appropriate screens were being displayed as a result (i.e. Hearth Health assessment).

From a technical perspective, there were several challenges. 
1. **User to log in with.** Typically, I would attempt to locate an existing user to log in with; however, without the appropriate access or endpoints to be able to do this, I resorted to using a member that I had created. This creates another challenge, possibly to be solved later, when going through this workflow a second time. I found I needed to go in and manually cancel the appointment before I could try and schedule another service using this specific workflow.

2. **Identifying UI elements.** I did have some difficulty identifying some of elements in the UI. For example, as noted in the test, I had to hard code the specific date of the selected service. If this were to truly be a production level test, I would work with other engineers to help solve this problem to make this more dynamic. The problem this presents is that each day, there are a limited number of available appointments. Once those run out, then this test would continuously fail until those appointment times for that day are freed. 

3. **Some UI elements slow to load.** There were a few places in the Member Portal with slower loading UI elements. For example, I found that the Timezone confirmation modal as well as the Date/Time section of scheduling were slower to load. This led to the tests failing because it was trying to move on to the next step but could not. Therefore, I had to increase the default wait time in the `playwright.config.ts` file and also add a few waits - to ensure the Timezone confirmation modal loaded before trying to close it.

4. **Payment bing in iFrame.** I did have a difficult time identifying the fields and entering the credit card information until I realized all those fields were inside of an iframe. 

# Project
## Prerequisites
To project reuires the following to already be installed:
* nodejs

## Setup
To set up the project, 
1. Clone the repository.
2. `cd` into the directory.
3. Install all the dependencies using `npm ci`. This should install all the dependencies the project needs that are specified in the `package.json` file. these dependencies include:
* [dotenv](https://www.dotenv.org/)
* [fakerjs](https://fakerjs.dev/)
* [eslint](https://eslint.org/)

5. Install Playwright browsers using the following command:
    ```
    $ npx playwright install
    ```
6. Create a copy of the `.env.exmple` file and rename it to `.env`. You will also need to make the appropriate updates.

## Test execution
Tests can be executed with:
* To execute all tests: 
    ```
    $ npx playwright test
    ```

* To execute a specific test file:
  ```
  $ npx playwright test <path_to_test_file>
  ```

* To execute a specific test, run:
  ```
  $ npx playwright test <path_to_test_file>:<line_number_of_test>
  ```

* To execute a specific project, run:
  ```
  $ npx playwright test --project=<project_name>
  ```

## ESLint
ESLint is used to analyze the code to find any problems and standardize the codebase. It can be executed on the entire project using:
```
$ npx eslint .
``` 

or on a specific file/directory using:
```
$ npx eslint <path_to_test_file_or_directory>
```
