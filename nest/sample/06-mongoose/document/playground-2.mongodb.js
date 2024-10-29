/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'NEW_DATABASE_NAME';
const collection = 'NEW_COLLECTION_NAME';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/

// 테이블 목록
db.getCollectionNames();

// 전체 검색
db.cats.find({});

db.cats.find({ name: 'name09' });
db.cats.find({ name: /09$/ });

db.cats.find({ name: { $regex: '.*me.*' } }); // line  '%me%'
db.cats.find({ name: { $regex: '.*09' } }); // like '%09'
db.cats.find({ name: { $regex: 'name.*' } }); // like 'name%'

// https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like
// https://tychejin.tistory.com/371
db.users.find({ name: /a/ }); // Like '%a%'
db.users.find({ name: /^pa/ }); // Like 'pa%'
db.users.find({ name: /ro$/ }); // Like '%ro'
