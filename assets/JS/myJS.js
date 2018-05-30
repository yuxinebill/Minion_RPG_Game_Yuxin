$(document).ready(function() {

	var minions = [

	{	name	: "Bob",
		life	: 40,
		attack	: 5,
		defence	: 2
	},

	{	name	: "Stuart",
		life	: 20,
		attack	: 9,
		defence	: 4
	},

	{	name	: "Kevin",
		life	: 35,
		attack	: 8,
		defence	: 6	
	},


	{	name	: "Kuku",
		life	: 25,
		attack	: 12,
		defence	: 7,
	}];

	var newMinions = minions;
	var myCharacter = [];
	var enemy = [];

	//writing html
	function getCharactorsOnScreen () {
		for (i=0; i<newMinions.length; i++) {
			$("<div>").addClass("col-3").attr('id', newMinions[i].name).appendTo($(".row_1"));
			$("<div>").addClass("card").attr('id', "card" + newMinions[i].name).appendTo("#" + newMinions[i].name);
			$("<img>").attr("src", "assets/imgs/" + newMinions[i].name +".jpg").addClass("card-img-top").appendTo("#" + "card" + newMinions[i].name);
			$("<div>").addClass("card-body").append($("<button>")).addClass("btn btn-info").text(newMinions[i].name).appendTo("#" + "card" + newMinions[i].name);
		};	
	};

	getCharactorsOnScreen();


	function game () {
		$(".card").one("click", ".btn" , function(){

			function reset() {
				$(".row_1").empty();
				newMinions = minions;
				myCharacter = [];
				enemy = [];
				getCharactorsOnScreen();
				game();
			}; 

			$(this).hide();

			newMinions = [];
			
			var myCharacterIndex ;

			for (i=0 ; i<minions.length; i++) {
				// find out the which charactor the user choose
				if ($(this).text() ==  minions[i].name) {
					myCharacterIndex = i;
				};
				// push others charactors to enemies
				if ($(this).text() !==  minions[i].name) {
					newMinions.push(minions[i]);
				};
			};

			myCharacter = minions[myCharacterIndex];
			console.log(myCharacter);
			console.log(newMinions);
			$(".row_1").empty();

			//put my charactor on screen
			function myCharactorOnScreen (){
				$("<div>").addClass("col-3").attr('id', myCharacter.name).appendTo($(".row_1"));
				$("<div>").addClass("card").attr('id', "card" + myCharacter.name).appendTo("#" + myCharacter.name);
				$("<img>").attr("src", "assets/imgs/" + myCharacter.name +".jpg").addClass("card-img-top").appendTo("#" + "card" + myCharacter.name);
				$("<div>").addClass("card-header bg-info text-white").text("I am " + myCharacter.name ).prependTo("#" + "card" + myCharacter.name);
			};

			myCharactorOnScreen();
			//put enemies on screen
			getCharactorsOnScreen();

			//call them Bad Guy. CLICK find out the which enemy the user choose
			$(".btn").each(function(){
				$(this).text("Bad Guy " + $(this).text()).removeClass("btn-info").addClass("btn-warning");
			});

			// CLICK find out the which enemy the user choose
			$(".card").one("click", ".btn", function(){

				var enemyCharacterIndex;
				
				for (i=0 ; i<newMinions.length; i++) {
					var k = "Bad Guy " + newMinions[i].name;
				
					if ($(this).text() == k){
						enemyCharacterIndex = i;	
					} ;
				};

				enemy = newMinions[enemyCharacterIndex];
				console.log(enemy);
				$(".row_1").empty();

				myCharactorOnScreen();
				//create attack button
				$("<div>").addClass("col-6 dataDiv").appendTo($(".row_1")).append($("<button>").text("ATTACK").addClass("btn-info py-3 px-4 text-white attackBtn"));
				//create class .myAttack to show my attack each time
				$(".dataDiv").append($("<div>").addClass("myAttack mt-5 font-weight-bold").text("Attack Enemy : 0 Point"));
				//create class .beAttacked to show enemy attack me each time
				$(".dataDiv").append($("<div>").addClass("beAttacked mt-3 font-weight-bold").text("Be Attacked by Enemy : 0 Point"));

				function enemyOnScreen (){
					$("<div>").addClass("col-3").attr('id', enemy.name).appendTo($(".row_1"));
					$("<div>").addClass("card").attr('id', "card" + enemy.name).appendTo("#" + enemy.name);
					$("<img>").attr("src", "assets/imgs/" + enemy.name +".jpg").addClass("card-img-top").appendTo("#" + "card" + enemy.name);
					$("<div>").addClass("card-header bg-warning").text("Bad Guy " + enemy.name ).prependTo("#" + "card" + enemy.name);
				};
				enemyOnScreen();

				var attackCounter = 0;
				var myLife = myCharacter.life;
				var enemyLife = enemy.life;
				$(".attackBtn").click(function(){
					attackCounter = attackCounter + 1;

					var attackEachTime = myCharacter.attack * attackCounter;
					$(".myAttack").text("Attack Enemy : " + attackEachTime + " Points");
					$(".beAttacked").text("Be Attacked by Enemy : " + enemy.attack + " Point")

					myLife = myLife - enemy.attack + myCharacter.defence;
					enemyLife = enemyLife - myCharacter.attack + enemy.defence;

					if ( myLife>0 && enemyLife<0){
						alert("You Win!");
						reset();
						
					};

					if (myLife<0 && enemyLife>0){
						alert("You Lose!");
						reset();
						
					};

					console.log("my life is " + myLife);
					console.log("enemy life is " + enemyLife);
				});		
			});
		});			
	};
	game();
});
