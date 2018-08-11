# Setup

Create a config file with the following contents in `/src/config.js`

```
{
    db: {
        host: 'myhost.server.com',
        user: 'user',
        password: 'password,
        database: 'databasename',
    },
    port: 8080,
    bodyLimit: "100kb",
    corsHeaders: ["Link"],
}
```

# Usage

`npm install`

`npm run dev`
