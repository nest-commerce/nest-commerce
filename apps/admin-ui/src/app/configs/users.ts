import { DataField } from '@nest-commerce/ui';
import { UserDto } from '@nest-commerce/data';

export const USER_FIELDS: DataField<UserDto>[] = [
  { key: 'id', title: 'ID' },
  {
    key: 'firstName',
    title: 'First Name',
    type: 'text',
    hidden: true,
    editable: true,
  },
  {
    key: 'lastName',
    title: 'Last Name',
    type: 'text',
    hidden: true,
    editable: true,
  },
  { key: 'username', title: 'Email / Username', type: 'email', editable: true },
  { key: 'createdAt', title: 'Joined At', type: 'date' },
  { key: 'updatedAt', title: 'Last Updated At', type: 'date' },
];
