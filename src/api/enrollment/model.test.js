import { Enrollment } from '.'

let enrollment

beforeEach(async () => {
  enrollment = await Enrollment.create({ enrollment_uuid: 'test', class_uuid: 'test', user: 'test', role: 'test', primary_role: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = enrollment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(enrollment.id)
    expect(view.enrollment_uuid).toBe(enrollment.enrollment_uuid)
    expect(view.class_uuid).toBe(enrollment.class_uuid)
    expect(view.user).toBe(enrollment.user)
    expect(view.role).toBe(enrollment.role)
    expect(view.primary_role).toBe(enrollment.primary_role)
    expect(view.status).toBe(enrollment.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = enrollment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(enrollment.id)
    expect(view.enrollment_uuid).toBe(enrollment.enrollment_uuid)
    expect(view.class_uuid).toBe(enrollment.class_uuid)
    expect(view.user).toBe(enrollment.user)
    expect(view.role).toBe(enrollment.role)
    expect(view.primary_role).toBe(enrollment.primary_role)
    expect(view.status).toBe(enrollment.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
