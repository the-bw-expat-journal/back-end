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
## Note: Tokens only last 30 Minutes. Please notify me if you want this to change

# Protected Endpoints (Requires a valid token)
---

## Posts

[GET] `/api/posts/allPosts` - See ALL existing posts ALL OF THEM ;)

[GET] `/api/posts` - See all existing posts for user

Authorization header required as it contains the username to narrow the posts only to that username

[POST] `/api/posts` - Add a post for a specific user.

Authorization header required as it contains the username needed to assign a post to.

Fields for creating a new post. (Only 1 of these is required.)
- username
- img_url
- title
- description


### body request schema:
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


---
## Comments

### ALL BELOW REQUIRE AUTHENTICATION BY TOKEN

[POST] `/api/posts/:id/comments` - Adds new comment to a specific post.

The comment's creator will be the current logged in user.

Fields for creating a comment.
```json
{
    "text": "Sweet ride dude >:)"
}
```

[GET] `/api/posts/:id/comments` - Gets all existing comments for a specific post.

[GET] `/api/comments/all` - Retrieves all existing comments.

[GET] `/api/comments/:id` - Gets a specific post by id

[DELETE] `/api/comments/:id` - Deletes a specific post by id

[PUT] `/api/comments/:id` - Edits a specific post by id

With the put request you can choose what to edit.

If you just want to edit the text, you can do this.

```json
{
    "text": "Whoops, this is what I meant to say"
}

If you want to edit the comments text, creator, and the post it belongs to you can do so as well.

```json
{
    "text": "",
    "username": "kristian",
    "post_id": ""
}
```

Though personally... I don't think its a good idea to allow the user to change the post a comment belongs to.
The same goes for change the creator of a comment.
I recommend only changing the text field.

---

## Likes

### Authorization token required.

[GET] `/api/posts/:id/like` - Checks if a like exists or not for a User on a Post. Returns 1 if a like exists. Returns 0 if there is no like.

[POST] `/api/posts/:id/like` - Adds a like to specified post. The like is tied to the user that is currently logged in.

[DELETE] `/api/posts/:id/like` - Removes a users like on specified post.
