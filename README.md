# slack-api-client
このソースコードは再配布可能です。

## 0. slack-api-clientについて
指定したSlackチャンネルのメッセージ履歴を取得します。  
チャンネルは外だしの`.env`ファイルに指定します。

## 1. ランタイム
以下ソフトウェアが使える環境を用意します。
- Docker 
- Bash
- node, npm *必須ではない

## 1. ツール
- `init.sh` ... 初期化スクリプト。
- `run_container.sh` ... Dockerコンテナを起動します。
- `destroy_container.sh` ... 不要なコンテナ、イメージを削除します。
- `display_output.sh` ... 生成したJSONファイルの内容を確認します。

## 2. 実行手順
以下の手順を踏むことで、Slackの特定のチャンネルのメッセージ履歴をJSONファイルに書き出します。
1. `chmod +x init.sh`を実行、初期化スクリプトの実行権限を付与します。
2.  `./init.sh` を実行します。`.env`ファイルやシェルスクリプトの初期化をします。
3.  できた`.env`ファイルにSlackのAPIトークン、チャンネルIDを差し込みます。`.envsample`を参照のこと。
4.  `./run_container.sh`でコンテナを実行します。
5. 最後に`./display_output.sh`を実行し、成果物を確認します。
上記手順により、`dest`ディレクトリにメッセージのJSONファイルが生成されていれば終了です。