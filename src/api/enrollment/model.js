import mongoose, { Schema } from 'mongoose'

const enrollmentSchema = new Schema({
  enrollment_uuid: {
    type: String
  },
  class_uuid: {
    type: String
  },
  user: {
    type: String
  },
  role: {
    type: String
  },
  primary_role: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true
})

enrollmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      enrollment_uuid: this.enrollment_uuid,
      class_uuid: this.class_uuid,
      user: this.user,
      role: this.role,
      primary_role: this.primary_role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

module.exports = mongoose.model('Enrollment', enrollmentSchema)
export default module.exports
