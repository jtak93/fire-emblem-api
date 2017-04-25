Fire Emblem
==============
Web services for Fire Emblem

### Install
[Mongodb](https://www.mongodb.org/) is suggested in order to develop with a local database.
```
npm install
```

### Start the server
Before you start the server, the server requires a couple of environment variables to be set.  You should get these in an email.

```

```
npm start
```

### Testing
```
npm test
```

Sometimes it helps to be able to mock s3 while doing some testing.  S3rver project is recommended:

```
npm install -g s3rver
mkdir -p ~/.s3rver/eventmakr-vendors
s3rver -d ~/.s3rver
```

### Authentication


## Admin portal

### Connecting to local mongo shell
```
mongo localhost:27017/fireemblem
```


