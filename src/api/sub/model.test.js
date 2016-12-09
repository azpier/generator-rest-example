import { Sub } from '.'

let sub

beforeEach(async () => {
  sub = await Sub.create({ name: 'test', disabled: 'test', org: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = sub.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sub.id)
    expect(view.name).toBe(sub.name)
    expect(view.disabled).toBe(sub.disabled)
    expect(view.org).toBe(sub.org)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = sub.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sub.id)
    expect(view.name).toBe(sub.name)
    expect(view.disabled).toBe(sub.disabled)
    expect(view.org).toBe(sub.org)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
