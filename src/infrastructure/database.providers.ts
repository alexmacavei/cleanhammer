import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        process.env.DATABASE_URL || 'mongodb://localhost:27017/cleanhammer',
      ),
  },
];
