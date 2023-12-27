import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    required: [true, 'courseId field required'],
    ref: 'Course',
  },
  rating: {
    type: Number,
    required: [true, 'Rating field required'],
  },
  review: {
    type: String,
    required: [true, 'review details is needed if you give rating'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const ReviewModel = model<TReview>('Review', reviewSchema);

export default ReviewModel;
