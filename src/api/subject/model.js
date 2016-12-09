import mongoose, { Schema } from 'mongoose'

const subjectSchema = new Schema({
  subject_uuid: {
    type: String
  },
  name: {
    type: String
  },
  organization_uuid: {
    type: String
  },
  disabled: {
    type: Boolean
  },
  loc :  { type: {type:String,enum: "Point", default: "Point"}, coordinates: { type: [Number],   default: [0,0]} },
}, {
  timestamps: true
})

subjectSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      subject_uuid: this.id,
      name: this.name,
      organization_uuid: this.organization_uuid,
      disabled: this.disabled,
      loc: this.loc,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    const sview = {
      // simple view
      id: this.id,
      subject_uuid: this.id,
      name: this.name,
      organization_uuid: this.organization_uuid,
      disabled: this.disabled,
      total: 100
    }


    return full ? {
      ...view
      // add properties for a full view

    } : 
       sview
  }
}

module.exports = mongoose.model('Subject', subjectSchema)
export default module.exports
