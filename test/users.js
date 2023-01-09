import supertest from 'supertest'
import { expect } from 'chai'
const request = supertest('https://gorest.co.in/public/v1/')

const token = '51a8a5d28843d055cb5cbabd72b03d34f1281078ec17fe239051a4d2a5062264'

describe('Users ', () => {
  it('Get / Users', () => {
    // request.get(`users?access-token=${token}`).end((err, res) => {
    //   expect(res.body.data).to.not.be.empty
    //   done()
    //   //done eklenmemsi durumunda thread safe olmadigi icin ilk once kodu calistiriyor ve calistirdigi icin test pass yapmis oluyor
    //   //bunun onune gecmek icin done komutu ve methodu ekleniyor.
    // })

    return request.get(`users?access-token=${token}`).then((res) => {
      expect(res.body.data).to.not.be.empty
    })
  })
  it('Get / users/:id', () => {
    return request.get(`users/4252?access-token=${token}`).then((res) => {
      expect(res.body.data.id).to.eq(4252)
      expect(res.body.data.gender).to.eq('male')
    })
  })
  it('Get / users with query params', () => {
    const url = `users?access-token=${token}&page=5&gender=female&status=active`

    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq('female')
        expect(data.status).to.eq('active')
      })
    })
  })
})
