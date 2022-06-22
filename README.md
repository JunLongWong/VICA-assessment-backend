# <b>Description</b> #

GovTech VICA Assessment - Backend.</br>
## This project is still under active development

## <b>Techstack Used:</b>

### TypeScript + Mongoose + MongoDB + Express API Server
This project is build using typescript-express-starter as boilerplate code. More info here: https://www.npmjs.com/package/typescript-express-starter

Project built using MVC architecture.
A Super User will be created upon successful app initialisation.
Implemented JWT for authentication and authorization.
Backend is not storing any session information. Hence, during auth process, server does not need to access session date stored somewhere, each request can be processed by a different process/machine efficiently. No data saved in RAM nor required to perform storage I/O, resulting in high scalability.

#### MongoDB Schema Design:
- User, Book, BorrowingHistory Collections
- Opt to model unbounded 1-to-Many relationship with Parent References for Book <=> Borrowing-History Collections
- Book Availability: Book will be 'AVAILABLE' when its quantity is >= 1 
- Borrow Logic[Yet to complete]: Create new document in BorrowingHistory Collection && Search for Book._id in Books Collection, decrement its quantity && update Book Availability.
- Return Logic[Yet to complete]: Update return_date in BorrowingHistory, find book._id in Books Collection, increment quantity && update book availability.

#### Advantage:
- clearly 1 to many relationship where amount of related borrowing documents is unbounded.
- would store borrowing-history collection separately & use parent reference(Book ObjectId) to connect them.
- Able to create index on the field referencing the parent document to increase query performance if required in future.

#### Disadvantage of embedding borrowing-history field or using child reference in Book Collection:
- Documents in borrowing-history field could grow & become unwieldy given the unbounded cardinality of this relation design & could easily exceed the 16MB size limit per document.

#### Assumption: 
-  A book is assumed to be the ‘same book’ if attributes (title,description,genre,author,published_year) between records are similar.
## <b>Installation</b>

- Install Docker

refer to .env.development.local.sample files and create file named '.env.development.local' in root directory with appropriate values.

## <b>API Spec</b>
### Note: Documents for swagger api specs is not ready at the moment !! 
- Refer to swagger.yaml. Open it in a [swagger editor](https://editor.swagger.io/)<br>
###

## API Routes:
Routes => Controllers => Service => return response data (had defined custom class for users & book response data)

#### Index Route: 
- GET: localhost:3000/

#### Auth Management:
- GET: localhost:3000/login
- GET: localhost:3000/logout

#### User Management:
- GET: localhost:3000/users
- GET: localhost:3000/users/{id}
- POST: localhost:3000/users 
- PUT: localhost:3000/users/{id}
- DELETE: localhost:3000/users/{id}

#### Book Management:
- GET: localhost:3000/books
- GET: localhost:3000/books/{id}
- POST: localhost:3000/books 
- PUT: localhost:3000/books/{id}
- DELETE: localhost:3000/books/{id}

#### Borrowing Management: [Yet to complete]
- GET: localhost:3000/borrow-history/{id}
- POST: localhost:3000/borrow-history 
- PUT: localhost:3000/borrow-history/{id}

### <b>Run app with docker</b>

- docker-compose up --build


## <b>Stay in touch</b>

- Linkedin - https://sg.linkedin.com/in/wong-jun-long-92999317a

