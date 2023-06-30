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

    it.only('Create post with adding access token in header. Verify HTTP response status code. Verify post is created', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: registerinfo,
            failOnStatusCode: false
        }).then(responseOne => {
            console.log(responseOne)
        })
        cy.request({
            method: 'POST',
            url: '/login',
            body: registerinfo,
            failOnStatusCode: false
        }).then(response => {
            console.log(response)

            cy.request({
                method: 'POST',
                url: '/664/posts',
                body: {
                    registerinfo,
                    authorization: response.body.accessToken
                },
                headers: {
                    authorization: response.body.accessToken
                },
                failOnStatusCode: true
            }).then(responseTwo => {
                console.log(responseTwo)
            })
        })
    })
})
