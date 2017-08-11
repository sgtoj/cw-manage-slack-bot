# Simple ConnectWise Manage Slack Bot

Slack bot that parse sent messages for embedded ConnectWise ticket numbers and post a
message of said ticket number. ConnectWise ticket numbers must begin with a `#` symbol.

![](./resources/example.png)

## Instructions

### How To Use

- Complete the **Installation** Instructions
- Add the Bot user to channel, group, or direct message to listen for CW
  tickets.

### Installation

#### Slack

- Create a new [Slack App](https://api.slack.com/apps)
  - Give it a name and assign it desired team.
- Add **Bot Users**
  - Example: `@cwbot`
- Turn on Event Subscription
  - Can *not* assign **Request URL** yet.
- Subscribe to _Bot_ Events:
  - `message.channels`
  - `message.groups`
  - `message.im`
  - `message.mpim`
- Add Permissions:
  - `chat:write:bot`
- Install App
- Complete the **Application** Instructions
- Add **Request URL** for Event Subscriptions
  - This only has to be done once.

#### Application

- Open Terminal or Command Prompt
- Clone Repository
  - `git clone https://github.com/sgtoj/cw-manage-slack-bot.git`
- Change Directory to Project's Root Directory
  - `cd ./cw-manage-slack-bot/`
- Install NPM Packages
  - `npm install`
- Run Compile
  - `npm run compile`
- Config Settings via Config File or Environment Variables
  - See the respective section below.
- Start App
  - `npm start`

##### Config File

The config file is one way to configure the application.

- Copy `appconfig.template.json` to `appconfig.json`
  - `cp ./appconfig.template.json ./appconfig.json`
  - Git will ignore the `appconfig.json` file.
- Fill in the blank values in the `appconfig.json` file.

##### Environment Variabels

These enviroment variables can be used to override any settings that is
defined by default or defined the in the `appconfig.json` (explained above).

- `SERVER_PORT`: Server port listening for incoming Slack webhook events.
  - Default: 80
- `SERVER_BASEPATH`: Base URL path for incoming slack webhook events.
  - Example: `/coolbot`
- `SLACK_AUTHTOKEN`: Slack **OAuth Access Token** for the app.
  - Example: `xoxp-xxx-xxx-xxx-xxx`
- `SLACK_BOTAUTHTOKEN`: Slack **Bot User OAuth Access Token** for the app.
  - Example: `xoxb-xxx-xxx-xxx-xxx`
- `SLACK_VALIDATIONTOKEN`: Slack **App Credential Verification Token**.
  - Example: `zxy098`
- `CWMANAGE_COMPANYID`: ConnectWise company name.
  - Example: `abctech`
- `CWMANAGE_COMPANYURL`: FQDN to the ConnectWise server or api server.
  - Default: `api-na.myconnectwise.net`
- `CWMANAGE_PUBLICKEY`: ConnectWise API user's public key.
  - Example: `a1B2c3`
- `CWMANAGE_PRIVATEKEY`: ConnectWise API user's private key.
  - Example: `a1B2c3`

### Troubleshooting

#### General

- `git pull` the latest commit
- execute `npm run refresh`