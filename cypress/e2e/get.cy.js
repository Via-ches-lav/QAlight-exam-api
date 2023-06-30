describe('Get api suit', () => {
    it('Get all posts and verify status code/content type', () => {
        for (let i = 1; i <= 100; i++) {
            cy.log(`Request with id: ${i}`)
            cy.request('GET', `/posts?id=${i}`).then(response => {
                console.log(response)
                expect(response.body['0'].id).to.be.equal(i)
                expect(response.status).to.be.equal(200)
                expect(response.headers['content-type']).to.be.eq('application/json; charset=utf-8')
        })
    }
    })

    it('Get only first 10 posts. Verify HTTP response status code. Verify that only first posts are returned', () => {
        for (let i = 1; i <= 10; i++) {
            cy.log(`Request with id: ${i}`)
            cy.request('GET', `/posts?id=${i}`).then(response => {
                console.log(response)
                expect(response.status).to.be.equal(200)
                expect(response.body['0'].id).to.be.greaterThan(0).not.be.greaterThan(10)
        })
    }
    })

    it.only('Get posts with id = 55 and id = 60. Verify HTTP response status code. Verify id values of returned records', () => {
            cy.log('Request with id: 55')
            cy.request('GET', '/posts?id=55').then(response => {
                console.log(response)
                expect(response.status).to.be.equal(200)
                expect(response.body['0'].id).to.be.equal(55)
        })
            cy.log('Request with id: 60')
            cy.request('GET', '/posts?id=60').then(response => {
                console.log(response)
                expect(response.status).to.be.equal(200)
                expect(response.body['0'].id).to.be.equal(60)
        })
    })
})
