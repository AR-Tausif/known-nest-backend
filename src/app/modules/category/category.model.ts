import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';
// TODO: Need to update createdBy with collection name
const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: [true, 'name field is required'],
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const CategoryModel = model<TCategory>('Category', categorySchema);
export default CategoryModel;
