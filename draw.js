/*
function draw(index, container, sz){
	var arr;
	
	if (bestBoard[index] == null){
		arr = defaultBoard;
	}else{
		var boundary = boundingRectangleSize(bestBoard[index]);
		
		var length = Math.max(boundary[1] - boundary[0], boundary[3] - boundary[2])
		printBoard([bestBoard[index]]);
		arr = getArrayWithSize(bestBoard[index], boundary[0], boundary[0] + length, boundary[2], boundary[2] + length);
	}
	
	var col = Math.max(arr[0].length, arr.length), row = col, size = sz == null ? 7 : sz;

	var mytable = '<table cellpadding="0" cellspacing="0"><tbody><tr>';
	
	for (var i = 0; i < col*row; i++) {
	  if (i % col == 0 && i != 0) {
	    mytable += "</tr><tr>";
	  }
  
  
	  if (arr[Math.floor(i/col)][i%col] == '.'){
	  mytable += "<td>" + '<table class="empty" cellpadding="' + size + '"><tr><td></td></tr></table>' + "</td>";
	  }else{
	  mytable += "<td>" + '<table class="filled" cellpadding="' + size + '"><tr><td>' + arr[Math.floor(i/col)][i%col] + '</td></tr></table>' + "</td>";
	  }
  
	}

	mytable += "</tr></tbody></table>";

	document.getElementById(container).innerHTML = mytable;
}
*/
function filterBestBoard(){
	
	for (var i=0;i<bestBoard.length;i++){
		
		var boundary = boundingRectangleSize(bestBoard[i]);
		var length = Math.max(boundary[1] - boundary[0], boundary[3] - boundary[2])
		var arr = getArrayWithSize(bestBoard[i], boundary[0], boundary[0] + length, boundary[2], boundary[2] + length);
		var uniq = true;
		
		for (var j=0;j<bestBoard.length;j++){
			if (i == j){continue;}
			
			var _boundary = boundingRectangleSize(bestBoard[j]);
			var _length = Math.max(boundary[1] - boundary[0], boundary[3] - boundary[2])
			var _arr = getArrayWithSize(bestBoard[j], boundary[0], boundary[0] + length, boundary[2], boundary[2] + length);
			
			if (JSON.stringify(arr)==JSON.stringify(_arr)){
				uniq = false;
			}
		}
		
		if (uniq) {
			finalBestBoard.push(arr);
		}
		
	}
		
}

function finalDraw(index, container, sz){
	
	var arr;
	
	if (finalBestBoard[index] == null){
		if ($('#textarea').val() == ""){
			arr = defaultBoard;
		}else{
			arr = [
					['.','.','.','.','.','F','.'],
					['.','.','Y','.','.','O','.'],
					['.','.','E','.','.','U','.'],
					['N','O','T','H','I','N','G'],
					['.','.','.','.','.','N','.'],
					['.','.','.','.','.','.','.'],
					['.','.','.','.','.','.','.']
				];
		}
	}else{
		arr = finalBestBoard[index];
	}
	var col = Math.max(arr[0].length, arr.length), row = col, size = sz == null ? 7 : sz;

	var mytable = '<table cellpadding="0" cellspacing="0"><tbody><tr>';
	
	for (var i = 0; i < col*row; i++) {
		var allEmpty = true;
		for (var j = 0;j<arr[Math.floor(i/col)].length;j++){
			if (arr[Math.floor(i/col)][(i+j)%col] != '.'){
				allEmpty = false;
				break;
			}
		}
		
		if (allEmpty){continue;}
		
	  	if (i % col == 0 && i != 0) {
	    	mytable += "</tr><tr>";
	  	}
  
	  	if (arr[Math.floor(i/col)][i%col] == '.'){
	  	  mytable += "<td>" + '<table class="empty" cellpadding="' + size + '"><tr><td></td></tr></table>' + "</td>";
	  	}else{
	  	  mytable += "<td>" + '<table class="filled" cellpadding="' + size + '"><tr><td class="center-align" style="font-size:1.3em">' + arr[Math.floor(i/col)][i%col].toUpperCase() + '</td></tr></table>' + "</td>";
	  	}
	}

	mytable += "</tr></tbody></table>";

	document.getElementById(container).innerHTML = mytable;
}