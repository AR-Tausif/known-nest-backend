import mongoose, { Schema } from 'mongoose';
import { CourseDetails, TCourse, Tag } from './course.interface';

const tagSchema = new Schema<Tag>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

const detailsSchema = new Schema<CourseDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: { type: Number, required: true },
    tags: { type: [tagSchema], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: { type: detailsSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const CourseModel = mongoose.model<TCourse>('Course', courseSchema);

export default CourseModel;
