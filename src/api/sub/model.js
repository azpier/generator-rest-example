import mongoose, { Schema } from 'mongoose'

const subSchema = new Schema({
  name: {
    type: String
  },
  disabled: {
    type: String
  },
  org: {
    type: String
  }
}, {
  timestamps: true
})

subSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      disabled: this.disabled,
      org: this.org,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

module.exports = mongoose.model('Sub', subSchema)
export default module.exports
