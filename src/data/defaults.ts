const defaults = {
    config: {
        "server": {
            "port": 80,
            "basePath": ""
        },
        "slack": {
            "authToken": "",
            "botAuthToken": "",
            "validationToken": ""
        },
        "team": {
            "teamId": "main",
            "cwmanage": {
                "companyId": "",
                "companyUrl": "api-na.myconnectwise.net",
                "publicKey": "",
                "privateKey": "",
                "timeout": 5000
            }
        }
    }
};

export default defaults;