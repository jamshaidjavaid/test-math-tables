var startPlaying = false;
var score ;
var action;
var timeRemaining;
var correctAns;
// start/reset 
document.getElementById("start").onclick = function(){
	// check if we want to start game
	if(startPlaying == true){
		location.reload();
	} 
	else {
		//changing playing status to true so that when we click on reset it may restart
		startPlaying = true; 
		//if we do not play
		//setting score = 0
		score = 0;
		document.getElementById("scoreValue").innerHTML = score;
		//hiding game over pannel
		hide("gameOver");
		//show countdown box
		show("clock");
		timeRemaining = 60;
		document.getElementById("clockValue").innerHTML = timeRemaining;
		//change start button to reset
		document.getElementById("start").innerHTML = "Reset Game";
		//start countdown
		startCountdown();	
		//generate new QA
		generateQA();
	}
} 


for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing     
    if(startPlaying == true){//yes
        if(this.innerHTML == correctAns){
        //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("scoreValue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //Generate new Q&A
            
            generateQA();
        }else{
        //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}




function startCountdown() {
	action = setInterval(
		function function_name(){
			timeRemaining -= 1;
			document.getElementById("clockValue").innerHTML = timeRemaining;
			if (timeRemaining == 0){
				//game time over
				stopCountdown();
				// game over panel appears
				show("gameOver");
				document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
				//hide time remainig once finished
				hide("clock");
				// hide comments of try again and correct
				hide("correct");
				hide("wrong");
				startPlaying = false;
				document.getElementById("start").innerHTML = "Start Game";
		    }	
	    }, 1000)
    }

function stopCountdown(){
    clearInterval(action);
}
function hide(Id){
	document.getElementById(Id).style.display = "none";
}
function show(Id){
	document.getElementById(Id).style.display = "block";
}
function generateQA(){
	//creat variables
	var x = 1+Math.round(9* Math.random());
	var y = 1+Math.round(9* Math.random());
	correctAns = x*y;
	// show question
	document.getElementById("question").innerHTML = x + "x" + y;
	//finding and assigning correct position
	var correctPos = 1+Math.round(3* Math.random());
	document.getElementById("box" + correctPos).innerHTML = correctAns;



	//fill other boxes with wrong ans
	var answers = [correctAns];

	for (var i=1; i<5; i++){
		if (i != correctPos){
			var wrongAns;
			do{
				wrongAns = (1+Math.round(9* Math.random()))*(1+Math.round(9* Math.random()));
			}while(correctAns == wrongAns)
			document.getElementById("box" + i).innerHTML = wrongAns; 
		}
	}
}