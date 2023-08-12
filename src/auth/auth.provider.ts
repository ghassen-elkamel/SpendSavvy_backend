import { Connection } from 'mongoose';
import {
  USER_PROVIDER,
  DB_PROVIDER,
} from 'src/config';
import { UserSchema } from 'src/model/user.model';


export const AuthProvider = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DB_PROVIDER],
  },

];
