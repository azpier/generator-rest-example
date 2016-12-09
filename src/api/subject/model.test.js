import { Subject } from '.'

let subject

beforeEach(async () => {
  subject = await Subject.create({ subject_uuid: 'test', name: 'test', organization_uuid: 'test', disabled: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = subject.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(subject.id)
    expect(view.subject_uuid).toBe(subject.subject_uuid)
    expect(view.name).toBe(subject.name)
    expect(view.organization_uuid).toBe(subject.organization_uuid)
    expect(view.disabled).toBe(subject.disabled)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = subject.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(subject.id)
    expect(view.subject_uuid).toBe(subject.subject_uuid)
    expect(view.name).toBe(subject.name)
    expect(view.organization_uuid).toBe(subject.organization_uuid)
    expect(view.disabled).toBe(subject.disabled)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
