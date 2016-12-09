import mongoose, { Schema } from 'mongoose'

const types = ['TERM', 'GRADING_PERIOD', 'SEMESTER']

const asessionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: types,
    default: 'TERM'
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  school_uuid: {
    type: String,
    required: true
  },
  parent_uuid: {
    type: String
  }
}, {
  timestamps: true
})

asessionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      //id: this.id,
      academic_session_uuid: this.id,
      name: this.name,
      type: this.type,
      start_date: this.start_date,
      end_date: this.end_date,
      school_uuid: this.school_uuid,
      parent_uuid: this.parent_uuid,
      //createdAt: this.createdAt,
      //updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

module.exports = mongoose.model('Asession', asessionSchema)
export default module.exports
