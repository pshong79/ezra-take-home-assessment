# Question 1
## Part 1
### Question
The booking flow is integral to Ezra's business operation. Please go through the first three steps of the booking process including payment and devise 15 test cases throughout the entire process you think are the most important. When submitting the assignment, please return the test cases from the most important to the least important.

### Answer
**Member Portal**
1. Member Portal - Sign up a new user.
2. Member Portal - Schedule an MRI scan with both Lung and Heart CT Scans successfully.
3. User-Facing Portal - Add a new package for a member.
4. Member Portal - Schedule an MRI scan without any add-ons successfully.
5. Member Portal - Schedule a Heart CT Scan successfully.
6. Member Portal - Schedule a Lung CT Scan without any add-ons successfully.
7. Member Portal - Heart CT Scan displays the Heart Health survey modal.
8. User-Facing Portal - Create a new member.
9. User-Facing Portal - View a member's package.
10. User-Facing Portal - Add a new package for a member.
11. User-Facing Portal - Update an existing package for a member.
12. User-Facing Portal - View an appointment.
13. User-Facing Portal - Update an appointment.
14. User-Facing Portal - Update member information.
15. User-Facing Portal - Add note to member's package.

## Part 2
### Question
For the top 3 test cases from part 1, please provide a description explaining why they are indicated as your most important.

### Answer
These were my top three test cases because:
1. Member Portal - Sign up a new user.
   * A member needs to be able to sign up as a new user; otherwise, they would not be able to sign up for any services. Without the ability to sign up as a member, the Member Portal essentially has no value as members would not be able to access the content inside.

2. Member Portal - Schedule an MRI scan with both Lung and Heart CT Scans successfully.
   * There were several MRI scan options. To me, it doesn't matter which MRI scan option is selected; however, it is important to ensure that both the Lung and Heart CT Scans can be selected because that would be in indicator to me that all services are available to be selected and to be scheduled. In a situation when testing needs to be more focused and prioritized, this is the test I would prioritize the highest as it allows for verification that all types of services are available to be successfully selected, scheduled, and paid for.

3. User-Facing Portal - Add a new package for a member.
   * This is important to me for a couple of reasons:
     1. It confirms that the user is able to login successfully and has the appropriate privileges to view member data;
     2. If, for some reason, a member is not able to add packages through the Member Portal, then that can be done here. It still allows for services to be sold and business to continue, in an event a member is not able to access the Member Portal or if the Member Portal, itself, is unavailable.

# Question 2
## Part 1
### Question
Being privacy focused is integral to our culture and business model. Please devise an integration test case that prevents members from accessing other’s medical data.

Hint: Begin Medical Questionnaire.

### Answer
One of the test cases I could create to ensure that a member's medical data is protected is to ensure that when logging into a member's account, they can only access and see their own data. 

A way to possibly test this is to have one browser logged in as Member 1 and open another browser and log in as Member 2 and ensure that:
1. sessions are being shared - Member 1 can see Member 2's data or vice versa; or
2. Member 1's session, who was logged in before Member 2, is ended so that Member 2 cannot access Member 1's data/account.

Another way to ensure this is to do what the application is currently doing - not allow a member to complete forms on behalf of another person and force each person to have his/her own account.

## Part 2
### Question
Please devise HTTP requests from Part 1 to implement your test case. Submitting written HTTP requisitions is fine, you do not need to submit a postman project.

### Answer
A possible HTTP requests could look something like:
```
GET .../account/member/:member_id_1
header: {
  'Authorization': auth_token for member_id_1
}

`200 OK`
Response:
[
  {
    id: member_id_1,
    name: string,
    ...
  }
]
```
```
GET .../account/member/:member_id_1
header: {
  'Authorization': auth_token for member_id_2
}

`401 Unauthorized`
Response:
[
  {
    error: some error message indicating user does not have access to view
  }
]
```

Similar API requests could be made for `POST`/`PUT`/`PATCH`/`DELETE`

## Part 3
### Question
At Ezra, we have over 100 endpoints that transfer sensitive data. What is your thought process around managing the security quality of these endpoints? What are the tradeoffs and potential risks of your solution?

### Answer
To be honest, I haven't really had to consider security at this layer of the application before; however, I am definitely willing to learn how to do this and grow that side of my skillset. 

Taking a shot at answering this question, I think one thing I would potentially consider doing is grouping endpoints by functional domains and what parts of the application could/should have access to what other parts. For instance (and completely making this up), does the endpoints that handles scheduling have authorization to managing packages? Probably not; the other way, however, should managing packages be authorized to access endpoints that handle scheduling? From the workflow within the Member Portal, it seems so because the package selected determines which locations are loaded, so allow for that. 

The trade off to a design like this is that it can become very complex. Authorization can even be more granular to the ability to read and/or write or both so the complexity in design, implementation, and testing can increase very rapidly.
