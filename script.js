		const array_concursantes=
		[

"Opción 1",
"Opción 2",
"Opción 3",
"Opción 4",
"Opción 5",
"Opción 6",
"Opción 7",
"Opción 8",
"Opción 9",
"Opción 10",
"Opción 11",
"Opción 12",
"Opción 13"

		];

		let canvas=document.getElementById("idcanvas");
		let context=canvas.getContext("2d");
		let center=canvas.width/2;

		context.beginPath();
		context.moveTo(center,center);
		context.arc(center,center,center,0, 2*Math.PI);
		context.lineTo(center,center);
		context.fillStyle ='#33333333';
		context.fill();

		context.beginPath();
		context.moveTo(center,center);
		context.arc(center,center,center-10,0, 2*Math.PI);
		context.lineTo(center,center);
		context.fillStyle ='black';
		context.fill();

		function chart(){
			for (var i = 0; i < array_concursantes.length; i++) {
			context.beginPath();
			context.moveTo(center,center);
			context.arc(center,center,center-20,i*2*Math.PI/array_concursantes.length, (i+1)*2*Math.PI/array_concursantes.length);
			context.lineTo(center,center);
			context.fillStyle =random_color();
			context.fill();

			context.save();
			context.translate(center, center);
			context.rotate(3*2*Math.PI/(5*array_concursantes.length)+i*2*Math.PI/array_concursantes.length);
			context.translate(-center, -center);
			context.font = "13px Comic Sans MS";
			context.textAlign = "right";
			context.fillStyle = "white";
			context.fillText(array_concursantes[i], canvas.width-30, center);
			context.restore();
			}
		}

		function handleWin(winningSymbolNr){
    			
console.log(winningSymbolNr)
			display.hidden = true;
    			display.innerHTML = array_concursantes[winningSymbolNr];
console.log(winningSymbolNr)
			const index = array_concursantes.indexOf(array_concursantes[winningSymbolNr]);
			if (index > -1) {
  				array_concursantes.splice(index, 1);
			}
		}

		chart();
		let deg=0;
		let movement;

myBtn.addEventListener('click', () => {
	chart();
	let canvas=document.getElementById("idcanvas");

	myBtn.style.pointerEvents = 'none';

	ps  = 360/array_concursantes.length;
        rng      = Math.floor((Math.random() * 1440) + 360);
                
	rotation = ((Math.round(rng / ps) * ps)*10);
            
	picked = Math.round(array_concursantes.length - (rotation % 360)/ps);
	picked = picked >= array_concursantes.length ? (picked % array_concursantes.length) : picked;
handleWin(picked);

	console.log(rotation)

	canvas.style.transition = 'all 10s ease-out';

	canvas.style.transform=`rotate(${rotation}deg)`;

	canvas.classList.add('blur');
});

canvas.addEventListener('transitionend', () => {

	canvas.classList.remove('blur');

	myBtn.style.pointerEvents = 'auto';

	canvas.style.transition = 'none';
	display.hidden = false;

	if (array_concursantes.length < 1){
		swal({ title: "Reiniciar la ruleta", icon: "success", button: "Okey",})
			.then((value) => {
 				location.reload();
			});		
	}else{
		document.getElementById("idestado").innerHTML="Spin the wheel";
	}
  });
	

		function random_color(){
			let ar_digit=['2','3','4','5','6','7','8','9'];
			let color='';
			let i=0;
			while(i<6){
				let pos=Math.round(Math.random()*(ar_digit.length-1));
				color=color+''+ar_digit[pos];
				i++;
			}
			return '#'+color;
		}