const env = process.env;

export const core = {
    "server": {
        "port": env.SERVER_PORT || 80,
        "basePath": env.SERVER_BASEPATH || "",
        "static": {
            "basePath": env.SERVER_STATIC_BASEPATH || "",
            "localDir": env.SERVER_STATIC_LOCALDIR || "static"
        }
    },
    "slack": {
        "authToken": env.SLACK_AUTHTOKEN || "",
        "botAuthToken": env.SLACK_BOTAUTHTOKEN || "",
        "validationToken": env.SLACK_VALIDATIONTOKEN || ""
    }
};

export const team = {
    "teamId": "main",
    "cwmanage": {
        "companyId": env.CWMANAGE_COMPANYID || "",
        "companyUrl": env.CWMANAGE_COMPANYURL || "api-na.myconnectwise.net",
        "publicKey": env.CWMANAGE_PUBLICKEY || "",
        "privateKey": env.CWMANAGE_PRIVATEKEY || "",
        "timeout": env.CWMANAGE_TIMEOUT || 5000
    }
};