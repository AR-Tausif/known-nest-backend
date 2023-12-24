import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: [true, 'name field is required'],
    unique: true,
  },
});

const CategoryModel = model<TCategory>('Category', categorySchema);
export default CategoryModel;
