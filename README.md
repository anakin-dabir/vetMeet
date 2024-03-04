<p align="center">
  <img src="https://anakin-dabir.github.io/public/vetmeet.png" />
</p>
<p align="center">
<img src="https://img.shields.io/badge/react-v17.0.2-teal" />
<img src="https://img.shields.io/badge/react-redux-v7.2.8-purple" />
<img src="https://img.shields.io/badge/express-v4.17.1-blue" />
<img src="https://img.shields.io/badge/mongoose-v6.0.8-darkgreen" />
</p>
<p align="center">
<img src="https://img.shields.io/badge/@mui/material-v5.5.3-darkblue" />
<img src="https://img.shields.io/badge/twilio-v3.74-white" />

</p>

<hr />

### Introduction

VetMeet is web based solution to connect with veterans and engage them into community
services based on their interests. A veteran (from Latin vetus, meaning "old") is a person who has
had long service or experience in a particular occupation or field.This application will help
veterans of any profession to connect with other veterans and socialize through our platform and
can participate into any community services such public talks, motivational speeches into
educational institutions and organization, plantation drive and picnic etc. Additionally, they seecan
take initiate a new community service and can involve other veterans into it.

### Project Features

- Authorization using JWT
- Veterans can view profile of other veterans and organizations.
- Veterans can follow veterans and organizations.
- Veterans can search other veterans and organizations.
- Veterans can post on their profiles.
- Veterans can create, view and join events.
- Veterans can send event invitations to their followers.
- Veterans can accept/reject invitations.
- Organizations can create events and can send invitations to the veterans with matching hobbies.

## Run Locally

- Clone the project

```bash
  git clone https://github.com/anakin-dabir/vetMeet.git
```

- Go to the project directory

```bash
  cd vetMeet
```

- Install dependencies in both server and client folders

```bash
  cd frontend && npm i & cd backend && npm i
```

<li>You need the following environment variables to add on server in .env file:
<ol>
<li>
<code>DATABASE</code> mongodb url</li>
<li>
<code>TWILIO_ACCOUNT_SID</code> twilio account sid</li>
<li>
<code>TWILIO_AUTH_TOKEN</code> auth token</li>
<li>
<code>TWILIO_NOTIFY_SERVICE_SID</code> notify-service sid</li>
<li>
<code>TWILIO_NUMBER</code> twilio number</li>
<li>
<code>JWT_SECRET</code> secret token for JWT creation
</li>
<li>
<code>JWT_EXPIRE_TIME</code> expire time for JWT creation
</li>
<li>
<code>JWT_COOKIE_EXPIRE_TIME</code> expire time for JWT generated cookie
</li>
</ol>
</li>

- Start frontend, backend separately by navigating to respective dirs and:

```bash
  npm start
```
