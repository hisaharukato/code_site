process.env.TZ = 'Asia/Tokyo';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { init } from 'src/express';
init();

// import { select, insert } from 'src/mongoose/model/codes';
// import * as mongoose from 'mongoose';

// const main = async () => {
//   // console.log(
//   //   await insert({
//   //     id: String(new mongoose.mongo.ObjectId()),
//   //     genreId: 0,
//   //     title: 'てすとタイトル',
//   //     source: 'aaaa',
//   //     created_at: new Date(),
//   //     updated_at: new Date()
//   //   })
//   // );

//   console.log(await select('5e6329d591b6488ec0911e5e'));

//   console.log('fin');
// };

// main();
