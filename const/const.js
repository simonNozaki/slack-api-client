"use strice"

require("dotenv").config();

/**
 * API共通ドメイン
 */
const SLACK_API_DOMAIN = "https://slack.com/api";

/**
 * クライアント定数オブジェクト
 */
const clientConst = {

    /**
     * 認証テストメソッド
     */
    TARGET_URL_AUTH_TEST : SLACK_API_DOMAIN + "/auth.test",

    /**
     * チャンネルのメッセージ履歴
     */
    TARGET_URL_CHANNELS_HISTORY : SLACK_API_DOMAIN + "/channels.history",

    /**
     * ユーザ一覧
     */
    TARGET_URL_USERS_LIST : SLACK_API_DOMAIN + "/users.list",

    /**
     * Slack APIトークン
     */
    SLACK_API_TOKEN : process.env.SLACK_API_TOKEN,

    /**
     * 対象SlackチャンネルID
     */
    SLACK_CHANNEL_ID : process.env.SLACK_CHANNEL_ID

};

module.exports.clientConst = clientConst;
