# back-end

# Expat Journal API:

### heroku url: https://expat-journal-web31.herokuapp.com

## Authentication Endpoints:

### Register

[POST] `/api/register`
Required fields for registering a user:

- username (unique)
- password
- email (unique)
- name
- location

# data schema:

```json
{
  "username": "timmyturnip",
  "password": "123",
  "email": "timmy@gmail.com",
  "name": "Timmy",
  "location": "Miami, Florida"
}
```

Returns registered user's info.

### Login

[POST] `/api/login`
Required fields for logging in a user:

- username (unique)
- password

# data schema:

```json
{
  "username": "timmyturnip",
  "password": "123"
}
```

Returns token used for authorization on other endpoints, and user's info.

# Protected Endpoints (Requires a valid token)

### Posts

[GET] `/api/posts/all` - See ALL existing posts ALL OF THEM ;)

[GET] `/api/posts` - See all existing posts for user

Authorization header required as it contains the username to narrow the posts only to that username

[POST] `/api/posts` - Add a post for a specific user.

Authorization header required as it contains the username needed to assign a post to.

Fields for creating a new post. (Only 1 of these is required.)
- username
- img_url
- title
- description


# body request schema:
```json
{
    "img_url": "https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg",
    "title": "Beautiful",
    "description": "A simply captivating canvas.",
    "location": "Florida"
}
```

[GET] `/api/posts/:id` - Find post by id

[DELETE] `/api/posts/:id` - Delete post by id

[PUT] `/api/posts/:id` - Edit post by id

