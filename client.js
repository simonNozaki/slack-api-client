'use strict'

const request = require("request");
const clientConst = require("./const/const").clientConst;
const scriptUtil = require("script-util");
const fs = require("fs");
// ユーザIDリスト
var members = [];
// メッセージのリスト
var messages = []

/**
 * メセージ取得オプション
 */
const options = {
    url : clientConst.TARGET_URL_CHANNELS_HISTORY,
    headers : {
        "Authorization" : "Bearer " + clientConst.SLACK_API_TOKEN,
        "Content-Type" : scriptUtil.HTTP_HEADER_VALUE.CONTENT_TYPE_X_WWW_FROM_URLENCODED
    },
    method : scriptUtil.HTTP_METHOD.GET,
    form : {
        "channel" : clientConst.SLACK_CHANNEL_ID,
        "token" : clientConst.SLACK_API_TOKEN,
        "count" : 1000
    }
}

/**
 * ユーザIDリスト取得オプション
 */
const listFetchingOptions = {
    url : clientConst.TARGET_URL_USERS_LIST,
    headers : {
        "Authorization" : "Bearer " + clientConst.SLACK_API_TOKEN,
        "Content-Type" : scriptUtil.HTTP_HEADER_VALUE.CONTENT_TYPE_X_WWW_FROM_URLENCODED
    },
    method : scriptUtil.HTTP_METHOD.GET,
    form : {
        "token" : clientConst.SLACK_API_TOKEN
    }
}

/**
 * ユーザIDリストを取得する
 */
request.post(listFetchingOptions, function(error, response, body){
    // エラー
    if (error) {
        console.log("API通信中にエラーが発生しました。エラー内容 : ", error);
    }

    if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        members = extractUsers(result.members);
    }

    console.trace(scriptUtil.LOGGING_CONST.STR_PROCESS_END);

});

/**
 * メッセージの一覧を取得し、成果物を生成する。
 */
request.post(options, function(error, response, body){

    // エラー
    if(error){
        console.log("API通信中にエラーが発生しました。エラー内容 : ", error);
    }

    // 成功
    if (!error && response.statusCode == 200) {
        // ユーザ名とメッセージの抽出
        var result = JSON.parse(body);
        messages = extractUserAndMessages(result.messages);
        console.log(messages);

        // メッセージのユーザIDをキーに名前をはめる
        var output = bindUserAndMessage(messages, members);

        // 結果のファイル書き出し
        fs.writeFile("json/output.json", JSON.stringify(output), (err, data) => {
            if(err) {
                console.error(scriptUtil.LOGGING_CONST.TRACE_ERROR);
            } else {
                console.log(scriptUtil.LOGGING_CONST.STR_PROCESS_END);
            }
        });

    }
    
    console.trace(scriptUtil.LOGGING_CONST.STR_PROCESS_END);
});


/**
 * Slackユーザの情報を抽出します。
 * @param {members} members 
 * @returns ユーザIDとユーザ名のリスト
 */
function extractUsers(members) {

    return members.map((member) => {
        return { id: member.id, realName: member.real_name };
    });
}

/**
 * ユーザ名とメッセージのリストを抽出します。
 * @param {messages} messages
 * @returns ユーザとメッセージのリスト
 */
function extractUserAndMessages(messages) {

    return messages.map((message) => {
        return { text: message.text, user: message.user, userName: message.username };
    });
}

/**
 * メッセージ中ユーザIDとユーザ名をはめかえます。
 * @param {messages} messages 
 * @param {userIds} userIds 
 */
function bindUserAndMessage(messages, members) {

    // 結果リストの初期化
    var result = [];

    // IDの一致するユーザ名情報でオブジェクトを生成
    for (var message in messages) {
        var targetMember = members.filter((member) => member.id == message.user)
                            .map((target) => { return { text: message.text, memberName: target.real_name } });
        result.push(targetMember);
    }

    return result;
}