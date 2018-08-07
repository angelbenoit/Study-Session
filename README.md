<h1>Google Auth With Mern</h1>

<h4>
Add this to config/keys.js

```
module.exports = {
    googleClientID:'',
    googleClientSecret:'',
    mongoURI:''
}
```

</h4>

<p>
At https://console.developers.google.com, set Authorized JavaScript origins to http://localhost:5000, and Authorized redirect URIs to 'http://localhost:5000/auth/google/callback' and 'http://localhost:3000/auth/google/callback'. Double check that Cliend ID and Client secret match the ones in config/keys.js
</p>