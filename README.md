# PROJECT NAME : MY JOURNAL

## STARTING MONTH : OCTOBER 2020
## ENDING MONTH : NOVEMBER 2020

## STATUS: COMPLETED

### DESCRIPTION

This is a full stack web application project with proper google authentication and database setup with multiple schemas as input factors for storage. The main aim of this web application is just to store a private writing of a personnel which can be read by him afterwards from a home page. 

---

### WORKING 

The web application is basically developed with the help of different tools and frameworks. The structure of the application is done by HTML and the styling is provided by css and some bootstrap classes are also used. Now, starting with the understanding of this application, firstly the user will be redirected to the authenication page where they are required to login with the help of their google account as the authentication system is designed only with google Oauth and passport.js. With the help of a user schema in mongoDB a new entry will be created if it is a first time log in after that, that entry will only be required to redirect the person afterwards to the next page as only a specific google id provided is only checked. After successfully logging in the user will be redirected to the home page where all the previously written diaries are visible to them in the form of cards. With the provided navbar a user can navigate to the write page where a new diary can be created. That new diary will then be stored with the help of another mongoDB schema which will help in storing the title and content of the diary. Now to view the diary, ejs is being used to dynamically create a page with the post id which can be accesses by that user only.

---

### APPLICATION VIEW

---

### DESKTOP

---

<img src = "Screenshots/Login%20Page%20.png" > 
<br />
<img src = "Screenshots/Home%20Page.png" > 
<br />
<img src = "Screenshots/Write%20Page%20.png" > 
<br />
<img src = "Screenshots/Display%20Page%20.png" > 

---

### MOBILE

---

<img src = "Screenshots/Login%20Page%20Mobile%20.png" width=300 height=500>  <img src = "Screenshots/Home%20Page%20Mobile%20.png" width=300 height=500> 
<br />
<img src = "Screenshots/Write%20Page%20Mobile.png" width=300 height=500>  <img src = "Screenshots/Display%20Page%20Mobile.png" width=300 height=500> 

---

### LIMITATIONS AND FUTURE SCOPE

- The full CRUD operations cannot be performed. 
- If by mistake the page is refreshed the user have to write their whole content again.
- If a user is writing too frequently then it will be difficult to search a particular entry.
- A search bar can be deployed in order to ease the findings of written diaries.
- Alert box can be added for the user to tell them to write everyday.

---

### PROBLEMS EXPERIENCED DURING DEVELOPMENT

- While establishing authentication system an error was faced when logging in due to a logical error.
- Privacy issue was created as a different user was able to see another person's entry due to a missing foreign key. 
- Dynamic pages creation difficulty as working with snippets of ejs to pass javascript objects in html context. 



