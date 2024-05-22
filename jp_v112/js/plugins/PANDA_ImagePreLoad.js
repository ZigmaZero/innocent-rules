//=============================================================================
// PANDA_ImagePreLoad.js
//=============================================================================
// [Update History]
// 2021-05-29 Ver.1.0.0 First Release for MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MZ
 * @plugindesc Improve image preloading.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210529185556.html
 * 
 * @help Improve image preloading to eliminate image display lag.
 * 
 * By default, when the event starts, the face images of [Show Text]
 * and the picture images of [Show Picture] in the 200 lines
 * from the beginning of the event are loaded first.
 * This allows the images to be displayed quickly when they are actually used.
 * However, since there is no additional preloading of images appearing after
 * the 200th line, the lag will be noticeable later in the long event.
 * 
 * To solve this problem,
 * this plugin allows you to set the number of lines to preload.
 * When the number is 0, all lines of the event will be preloaded.
 * However, if the event is very long, it may take some time to preload.
 * In addition to the face images of Show Text and the picture of Show Picture,
 * the parallaxe images of [Change Parallax] and the character images of
 * [Change Image] in [Set Movenemt Route] are also preloaded.
 * 
 * You can also use the plugin command "Preload Image" to preload any images.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param SliceRows
 * @text Preload Lines
 * @desc Specify the number of lines to be preloaded in the event. 0 means all lines will be preloaded.
 * @type number
 * @default 0
 * @min 0
 * 
 * @command PRELOAD_IMAGE
 * @text Preload Image
 * @desc Preload the specified image file.
 * 
 * @arg file
 * @text Image File Name
 * @desc Specify the image file to be preloaded.
 * @type file
 * @dir img/
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 画像の事前読み込みを改善します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210529185556.html
 * 
 * @help 画像の事前読み込みを改善して、画像の表示ラグを解消します。
 * 
 * デフォルトでは、イベント開始時にイベントの先頭から200行目までにある
 * 「文章の表示」の顔グラフィックと「ピクチャの表示」の画像を先に読み込んで
 * 実際の使用時に画像を素早く表示できるようになっています。
 * しかし、200行目以降に登場する画像を追加で先読みすることはないため、
 * 長いイベントの場合、後半は画像の表示ラグが目立ってしまいます。
 * 
 * そこで、プラグインパラメータで先読み行数を任意に設定できるようにしました。
 * 先読み行数を 0 にすると、イベントの全行を先読みします。
 * ただし、非常に長いイベントの場合は先読みに時間がかかる可能性があります。
 * また「文章の表示」の顔グラフィックと「ピクチャの表示」の画像以外に、
 * 「遠景の変更」の遠景画像と「移動ルートの設定」中の「画像の変更」で
 * 使われる画像ファイルも、先読みしてくれるようになっています。
 * 
 * また、プラグインコマンド「画像先読み」で、任意の画像を先読みできます。
 * あわせてご利用ください。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param SliceRows
 * @text 先読み行数
 * @desc イベントで画像の先読み対象となる行数を指定します。0を指定すると全行が対象になります。
 * @type number
 * @default 0
 * @min 0
 * 
 * @command PRELOAD_IMAGE
 * @text 画像先読み
 * @desc 指定した画像ファイルを先読みします。
 * 
 * @arg file
 * @text 画像ファイル名
 * @desc 先読みする画像ファイルを指定します。
 * @type file
 * @dir img/
 * 
 */

/*:ko
 * @target MZ
 * @plugindesc 이미지의 미리 불러오기를 개선합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210529185556.html
 * 
 * @help 이미지의 미리 불러오기를 개선하여 이미지의 표시 렉을 해소합니다.
 * 
 * 기본적으로 이벤트가 시작할 때에 이벤트 명령의 처음부터 200행까지
 * "텍스트 표시"의 얼굴 이미지와 "그림 표시"의 그림을 미리 불러오고
 * 실제로 사용할 때에 그 이미지를 빠르게 표시할 수 있습니다.
 * 그러나 200행 이후에 등장하는 이미지를 추가로 불러오지는 않기 때문에
 * 긴 이벤트의 경우 후반은 이미지의 표시 렉이 눈에 띕니다.
 * 
 * 그래서 플러그인 매개 변수로 미리 불러올 행수를 설정할 수 있도록 했습니다.
 * 행수를 0으로 하면, 이벤트의 모든 행을 미리 불러옵니다.
 * 다만 매우 긴 이벤트의 경우는 미리 불러오는데 시간이 걸릴 가능성이 있습니다.
 * 또한 "텍스트 표시"의 얼굴 이미지와 "그림 표시"의 그림 이미지 이외에도
 * "먼 배경 변경"과 "이동 루트 설정"중의 "이미지 변경"에서 사용되는
 * 이비지 파일도 미리 불러오기 해줍니다.
 * 
 * 또 플러그인 명령 "이미지 미리 불러오기"로, 임의의 이미지를 미리 불러오기
 * 할 수 있습니다. 함께 이용하시기 바랍니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param SliceRows
 * @text 미리 불러올 행수
 * @desc 이벤트에서 이미지 미리 불러오기 대상이 될 행수를 지정합니다. 0을 지정하면 모든 행이 대상이 됩니다.
 * @type number
 * @default 0
 * @min 0
 * 
 * @command PRELOAD_IMAGE
 * @text 이미지 미리 불러오기
 * @desc 지정된 이미지 파일을 미리 불러옵니다.
 * 
 * @arg file
 * @text 이미지 파일명
 * @desc 미리 불러올 이미지 파일을 지정합니다.
 * @type file
 * @dir img/
 * 
 */


(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const SliceRows = parseInt(parameters['SliceRows']) || 0;
	
	
	//--------------------------------------------------
	// Plugin Command "PreLoad Image"
	//--------------------------------------------------
	PluginManager.registerCommand(pluginName, 'PRELOAD_IMAGE', function(args) {
		
		// get arguments
		const file = args['file'] || '';
		
		// preload image
		if (file !== '') {
			ImageManager.loadBitmap('img/', file);
		}
		
	});
	
	
	//--------------------------------------------------
	// Game_Interpreter.loadImages
	//  [Modified Definition]
	//--------------------------------------------------
	const _Game_Interpreter_loadImages = Game_Interpreter.prototype.loadImages;
	Game_Interpreter.prototype.loadImages = function() {
		// slice event commands (if SliceRows = 0, get all commands)
		const list = (SliceRows > 0) ? this._list.slice(0, SliceRows) : this._list;
		for (const command of list) {
			switch (command.code) {
				case 101: // Show Text
					ImageManager.loadFace(command.parameters[0]);
					break;
				case 231: // Show Picture
					ImageManager.loadPicture(command.parameters[1]);
					break;
				case 284: // Change Parallax (added)
					ImageManager.loadParallax(command.parameters[0]);
					break;
				case 205: // Set Movement Route (added)
					const commands = command.parameters[1].list;
					for (const cmd of commands) {
						switch (cmd.code) {
							case 41:	// Change Character
								ImageManager.loadCharacter(cmd.parameters[0]);
								break;
						}
					}
					break;
			}
		}
	};
	
})();

