'use strict'

const request = require("request");
const clientConst = require("./const/const").clientConst;
const scriptUtil = require("script-util");
const fs = require("fs");

/**
 * リクエスト実行オプション
 */
const options = {
    url : clientConst.TARGET_URL_CHANNELS_HISTORY,
    headers : {
        "Authorization" : "Bearer " + clientConst.SLACK_API_TOKEN,
        "Content-Type" : scriptUtil.HTTP_HEADER_VALUE.CONTENT_TYPE_X_WWW_FROM_URLENCODED
    },
    method : scriptUtil.HTTP_METHOD.GET,
    form : {
        "count" : 10,
        "channel" : clientConst.SLACK_CHANNEL_ID,
        "token" : clientConst.SLACK_API_TOKEN
    }
}

/**
 * POSTリクエスト
 */
request.post(options, callback)

/**
 * コールバック関数
 * @param error 
 * @param respose 
 * @param body
 */
function callback(error, response, body){

    // エラー
    if(error){
        console.log("API通信中にエラーが発生しました。エラー内容 : ", error)
    }

    // 成功
    if (!error && response.statusCode == 200) {
        // ユーザ名とメッセージの抽出
        var result = JSON.parse(body);
        var output = extractUserAndMessages(result.messages);

        console.log(scriptUtil.appendStdOut(output));

        // 結果のファイル書き出し
        fs.writeFile("json/output.json", JSON.stringify(output), (err, data) => {
            if(err) {
                console.error(scriptUtil.LOGGING_CONST.TRACE_ERROR);
            } else {
                console.log(scriptUtil.LOGGING_CONST.STR_PROCESS_END);
            }
        });

    }
    
    console.log(scriptUtil.LOGGING_CONST.STR_PROCESS_END);
}

/**
 * ユーザ名とメッセージのリストを抽出します。
 * @param {messages} messages
 * @returns ユーザとメッセージのリスト
 */
function extractUserAndMessages(messages) {

    return messages.map((message) => {
        return { text: message.text, userName : message.username };
    });
}
