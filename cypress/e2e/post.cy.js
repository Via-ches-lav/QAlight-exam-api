import example from '../fixtures/example.json'
import registerinfo from '../fixtures/registerinfo.json'
import { faker } from '@faker-js/faker'

example.body = faker.lorem.sentence(10)
example.id = faker.number.int({ min: 101, max: 150 })
example.title = faker.lorem.paragraph()
example.userId = faker.number.int({ min: 11, max: 15 })

registerinfo.email = faker.internet.email()
registerinfo.password = faker.internet.password()
registerinfo.id = faker.number.int(200)

describe('Post api suit', () => {
    it('Create a post. Verify HTTP response status code', () => {
        cy.request({
            method: 'POST',
            url: '/664/posts',
            body: example,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.equal(401)
        })
    })

    it('Create post with adding access token in header. Verify HTTP response status code. Verify post is created', () => {
        cy.log('Create a new user')

        cy.request({
            method: 'POST',
            url: '/register',
            body: registerinfo
        }).then(responseOne => {
            console.log(responseOne)
            expect(responseOne.status).to.be.equal(201)
        })

        cy.log('Login in previously created user and receive accessToken')

        cy.request({
            method: 'POST',
            url: '/login',
            body: registerinfo
        }).then(response => {
            console.log(response)
            expect(response.status).to.be.equal(200)

            cy.log('Post a new record with random email/password and with accessToken from previous request')

            cy.request({
                method: 'POST',
                url: '/664/posts',
                body: {
                    email: registerinfo.email,
                    password: registerinfo.password
                },
                headers: {
                    authorization: `Bearer ${response.body.accessToken}`
                }
            }).then(responseTwo => {
                console.log(responseTwo)
                expect(responseTwo.status).to.be.equal(201)

                cy.log('Getting page with posts and checking that post with your email from previous request was added successfully')

                cy.request('GET', '/664/posts').then(responseGet => {
                    console.log(responseGet)
                    expect(responseGet.body[responseGet.body.length - 1]).to.deep.include({ email: registerinfo.email })
                })
            })
        })
    })
})
