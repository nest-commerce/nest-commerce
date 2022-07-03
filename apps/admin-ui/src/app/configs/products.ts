import { DataField } from '@nest-commerce/ui';
import { ProductDto } from '@nest-commerce/data';

export const PRODUCT_FIELDS: DataField<ProductDto>[] = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name', type: 'text', editable: true },
  { key: 'description', title: 'Description', type: 'rich', editable: true },
  { key: 'createdAt', title: 'Created At', type: 'date' },
  { key: 'updatedAt', title: 'Last Updated At', type: 'date' },
];
