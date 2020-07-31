const server = require('../server');
const request = require('supertest')
const db = require('../data/dbConfig');
const supertest = require('supertest')

let token;

describe('GET / Tests if server runs properly', ()=>{
    it('Returns 200 OK', ()=> {
        return request(server).get('/')
            .expect(200)
    })
    it('Returns a json content', ()=> {
        return request(server).get('/')
            .expect('Content-Type', /json/)
    })
    it('Returns {status: "Server is Running"}', ()=>{
        return request(server).get('/')
            .then(res=>{
                expect(res.body.status).toBe('Server is up and running!')
            })
    })
})

describe('GET /api/users', ()=>{
    beforeEach(async () => {
        await db('users').truncate()
      })
    it('Returns empty list of users', ()=>{
        return request(server).get('/api/users')
            .then(res=>{
                expect(res.body).toEqual([])
            })
    })
})

describe('POST /api/auth/register', ()=> {
    it('Should return 201 success', async () => {
        const newUser = { username: "timothy", password: "baggins", name: "Timmy Baratheon", email: "yeah@live.com", location: "United States"};

        await supertest(server)
            .post("/api/auth/register")
            .send(newUser)
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
    it('Should return json', async ()=> {

        await supertest(server)
            .post("/api/auth/register")
            .expect('Content-Type', /json/)
    })
})

describe('POST /api/auth/login', ()=> {
    it('Should return 200 success', async () => {
        const user = { username: "timothy", password: "baggins"};

        await supertest(server)
            .post("/api/auth/login")
            .send(user)
            .then(res => {
                expect(res.status).toBe(200)
                token = res.body.token
                
            })
    })
    it('Should return json', async ()=> {

        await supertest(server)
            .post("/api/auth/login")
            .expect('Content-Type', /json/)
    })
})

describe('GET /api/posts', ()=> {
    it('Should return 200 success', () => {
        return request(server)
            .get("/api/posts")
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(200)
                console.log(res.body)
            })
    })
})