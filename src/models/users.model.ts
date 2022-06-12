import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { UserStatus } from '@/interfaces/userStatus.enum';
import { UserRoleType } from '@/interfaces/userRoleType.enum';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: UserRoleType,
    required: true,
    default: UserRoleType.MEMBER,
  },
  status: {
    type: UserStatus,
    required: true,
    default: UserStatus.ANALYSE,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
});

// creation of user model
const userModel = model<User>('User', userSchema);

export { userModel };
