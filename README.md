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

### Posts
