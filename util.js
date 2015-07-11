	var BOARDSIZE = 0, bestBoard = [], finalBestBoard = [], bestSize = 99999999, time, start, end, visit = [], wordStack = [], board;
	var wordsPosition = {};	
	var factor = 1;
	var wordsArray = [];
	
	function initBoard(){
		var boardd = [];
		for (var i=0;i<BOARDSIZE;i++){
			boardd.push([]);
			for (var j=0;j<BOARDSIZE;j++){
				boardd[i].push('.');
			}
		}
		return boardd;
	}
	
	function printBoard(board){
		if (board === []){
			console.log("No Solution found yet");
			return;
		}
		for (var k=0;k<board.length;k++){
			var boundary = boundingRectangleSize(board[k]);
			for (var i=boundary[0];i<=boundary[1];i++){
				var line = "";
				for (var j=boundary[2];j<=boundary[3];j++){
					line += board[k][i][j];
				}
				console.log(line);
			}
			var temp1 = boundary[1] - boundary[0] + 1;
			var temp2 = boundary[3] - boundary[2] + 1;
		
			console.log('Size : ' + temp2 + ' x ' + temp1);
		}
	}
	
	function getArrayWithSize(board, x1, x2, y1, y2){
		var res = [];
		for (var i=x1;i<=x2;i++){
			var temp = [];
			for (var j=y1;j<=y2;j++){
				temp.push(board[i][j]);
			}
			res.push(temp);
		}
		return res;
	}
	
	function boundingRectangleSize(board){
		var upperX = 0, lowerX = -1, leftY = 0, rightY = -1;
		for (var i=0, found = false;i<BOARDSIZE && !found;i++){		
			for (var j=0;j<BOARDSIZE && !found;j++){
				if (board[i][j] !== '.'){
					upperX = i;
					found = true;
				}
			}
		}
		
		for (var i=BOARDSIZE-1, found = false;i>-1 && !found;i--){		
			for (var j=0;j<BOARDSIZE && !found;j++){
				if (board[i][j] !== '.'){
					lowerX = i;
					found = true;
				}
			}
		}
		
		for (var j=0, found = false;j<BOARDSIZE && !found;j++){		
			for (var i=0;i<BOARDSIZE && !found;i++){
				if (board[i][j] !== '.'){
					leftY = j;
					found = true;
				}
			}
		}
		
		for (var j=BOARDSIZE-1, found = false;j>-1 && !found;j--){		
			for (var i=0;i<BOARDSIZE && !found;i++){
				if (board[i][j] !== '.'){
					rightY = j;
					found = true;
				}
			}
		}		
		return [upperX, lowerX, leftY, rightY];
	}
	
	function boundingArea(arr){
		return (arr[1] - arr[0]) * (arr[3]-arr[2]);
	}
	
	function printDirection(){
		for (var i=0;i<direction.length;i++){
			var line = "";
			for (var j=0;j<direction[i].length;j++){
				line += direction[i][j];
			}
			console.log(line);
		}
	}
	
	function validate(character, x, y, direction){
		if (direction === 'v'){
			
			var posx_s = x, posx_e = x, posy = y;
			var exist = false; if (board[x][y] !== '.'){ exist = true;}
			board[x][y] = character;
			
			while (board[posx_s][posy] !== '.'){
				posx_s--;
			}
			posx_s++;
			
			while (board[posx_e][posy] !== '.'){
				posx_e++;
			}
			posx_e--;
			
			var word = "";
			for (var i=posx_s;i<=posx_e;i++){
				word += board[i][posy];
			}
			//console.log("word " + word);
			for (var i=0;i<wordsArray.length;i++){
				if ((word.length > 1 && word === wordsArray[i]) || word.length == 1){
					if (!exist){board[x][y] = '.';}
					return true;
				}
			}
			
			if (!exist){board[x][y] = '.';}
			return false;
			
		}else{
			
			var posy_s = y, posy_e = y, posx = x;
			var exist = false; if (board[x][y] !== '.'){ exist = true;}
			board[x][y] = character;
			
			while (board[posx][posy_s] !== '.'){
				posy_s--;
			}
			posy_s++;
			
			while (board[posx][posy_e] !== '.'){
				posy_e++;
			}
			posy_e--;
			
			var word = "";
			for (var i=posy_s;i<=posy_e;i++){
				word += board[posx][i];
			}
			//console.log("word " + word);
			for (var i=0;i<wordsArray.length;i++){
				if ((word.length > 1 && word === wordsArray[i]) || word.length == 1){
					if (!exist){board[x][y] = '.';}
					return true;
				}
			}
			
			if (!exist){board[x][y] = '.';}
			return false;
		}
	}
	
	function putWord(word, x, y, direction){
		var result = [];
		if (direction === '>'){
			if (y > -1 && y + word.length < BOARDSIZE){
				for (var i=0;i<word.length;i++){
					if (board[x][y+i] === '.'){
					}else if (board[x][y+i] !== '.' && board[x][y+i] === word.charAt(i)){
						result.push(i);
					}
					else{return null;}
				}
			
				wordsPosition[word] = [x, y, direction];
				for (var i=0;i<word.length;i++){
					board[x][y+i] = word.charAt(i);
				}
			}else{
				return null;
			}
		}else{
			if (x > -1 && x + word.length < BOARDSIZE){
				for (var i=0;i<word.length;i++){
					if (board[x+i][y] === '.'){
					}else if ((board[x+i][y] !== '.' && board[x+i][y] === word.charAt(i))){
						result.push(i);
					}
					else{return null;}
				}
			
				wordsPosition[word] = [x, y, direction];
				for (var i=0;i<word.length;i++){
					board[x+i][y] = word.charAt(i);
				}
			}else{
				return null;
			}
		}
		return result;
	}
	
	function removeWord(word, except){
		//console.log('d');
		var x = wordsPosition[word][0], y = wordsPosition[word][1], dir = wordsPosition[word][2];
		if (dir === '>'){
			for (var i=0;i<word.length;i++){
				if (except.indexOf(i) === -1){
					board[x][y+i] = '.';
				}
			}
		}else{
			for (var i=0;i<word.length;i++){
				if (except.indexOf(i) === -1){
					board[x+i][y] = '.';
				}
			}
		}
		delete wordsPosition[word];
	}
	
	function copyBoard(board){
		var newBoard = [];
		
		for (var i=0;i<board.length;i++){
			newBoard.push(board[i].slice());
		}
		return newBoard;
	}
	
	function findCommonIndex(word1, word2){
		var arr1 = [];
		for (var i=0;i<26;i++){
			arr1.push([]);
		}
		
		for (var i=0;i<word1.length;i++){
			arr1[word1.charCodeAt(i) - 'a'.charCodeAt(0)].push(i);
		}
		
		var results = [];
		
		for (var i=0;i<word2.length;i++){
			if (arr1[word2.charCodeAt(i) - 'a'.charCodeAt(0)] !== []){
				for (var j=0;j<arr1[word2.charCodeAt(i) - 'a'.charCodeAt(0)].length;j++){
					results.push([arr1[word2.charCodeAt(i) - 'a'.charCodeAt(0)][j],i]);
				}
			}
		}
		return results;
	}
	
	function valid(){
		
		var visitX = [], visitY = [];
		for (var i=0;i<BOARDSIZE;i++){
			visitX.push([]);
			visitY.push([]);
			for (var j=0;j<BOARDSIZE;j++){
				visitX[i].push(0);
				visitY[i].push(0);
			}
		}
		
		for (var i=0;i<BOARDSIZE;i++){ // horizontaj
			for (var j=0;j<BOARDSIZE;j++){ // verticaj
				if (board[i][j] === '.'){continue;}
				if (!visitY[i][j]){
					var l = j, line = "";
					while (board[i][l] !== '.'){
						visitY[i][l] = 1;
						line += board[i][l];
						l++;
					}
					if (line.length>1 && wordsArray.indexOf(line) == -1){return false;}
				}
				
				if (!visitX[i][j]){
					var k = i, line = "";
					while (board[k][j] !== '.'){
						visitX[k][j] = 1;
						line += board[k][j];
						k++;
					}
					if (line.length>1 && wordsArray.indexOf(line) == -1){return false;}
				}
			}
		}
		return true;
		
	}
	
	function _linkAllWords(){
		//printBoard([board]);
		var now = new Date().getTime();
		if (wordStack.length == wordsArray.length){
			var temp = boundingArea(boundingRectangleSize(board));
			if (valid() && temp <= bestSize){
				if (temp == bestSize){
					var uniq = true;
					for (var k=0;k<bestBoard.length && uniq;k++){
						if (JSON.stringify(bestBoard[k])==JSON.stringify(board)){
							uniq = false;
						}
					}
					if (uniq) {
						bestBoard.push(copyBoard(board));
					}
				}else{
					bestBoard = [];
					bestBoard.push(copyBoard(board));
					bestSize = temp;
				}
			}
			return;
		}

		for (var w=0;w<wordsArray.length && now - start < time;w++){
			if (visit[w] == 1) {continue;}
			
			visit[w] = 1;
			wordStack.push(wordsArray[w]);
			
			_matchWords();
			
			wordStack.pop();
			visit[w] = 0;
			
			now = new Date().getTime();
		}
	}
	
	function _matchWords(){
		var now = new Date().getTime();
		var currentWord = wordStack[wordStack.length - 1];
		
		for (var k = wordStack.length - 2;k>-1 && now - start < time;k--){
			var indexArr = findCommonIndex(wordStack[k], currentWord);
			if (indexArr === []){continue;}
			
			var word1X = wordsPosition[wordStack[k]][0];
			var word1Y = wordsPosition[wordStack[k]][1];
			var word1dir = wordsPosition[wordStack[k]][2];
		
			for (var i=0;i<indexArr.length && now - start < time;i++){
				if (word1dir === '>'){
					var except = putWord(currentWord, word1X - indexArr[i][1], word1Y + indexArr[i][0], 'v');
					if (except === null){continue;}
					_linkAllWords();
					removeWord(currentWord, except);
				}else{
					var except = putWord(currentWord, word1X + indexArr[i][0], word1Y - indexArr[i][1], '>');
					if (except === null){continue;}
					_linkAllWords();
					removeWord(currentWord, except);
				}
				now = new Date().getTime();
			}
			now = new Date().getTime();
		}
	}
	
	function linkAllWords(){
		var totalCharacters = [];
		for (var i=0;i<26;i++){totalCharacters.push(0);}
		for (var i=0;i<wordsArray.length;i++){
			var word = wordsArray[i];
			for (var j=0;j<word.length;j++){
				var temp = word.charCodeAt(j) - 'a'.charCodeAt(0);
				totalCharacters[temp]++;
			}
		}
		
		var wordsValue = {};
		for (var i=0;i<wordsArray.length;i++){
			var word = wordsArray[i];
			var tot = 0;
			for (var j=0;j<word.length;j++){
				var temp = word.charCodeAt(j) - 'a'.charCodeAt(0);
				tot += totalCharacters[temp];
			}
			wordsValue[word] = tot;
		}
		
		wordsArray.sort(function(a, b){
			return wordsValue[b] - wordsValue[a];
		});
		
		var startX, startY;
		startY = Math.floor((BOARDSIZE - wordsArray[0].length) / 2);
		startX = Math.floor(BOARDSIZE/2);
		
		for (var i=0;i<wordsArray.length;i++){
			putWord(wordsArray[i], startX, startY, '>');
			//printBoard([board]);
			visit[i] = 1;
			wordStack.push(wordsArray[i]);
			_linkAllWords();
			
			removeWord(wordsArray[i], []);
			visit[i] = 0;
			wordStack.pop();
		}
	}