		const array_concursantes=
		[

			["#01CE61","Verde"],
			["#FFCD11","Amarillo"],
			["#0194FF","Azul"],
			["#CE01FE","Morado"],
			["#F22223","Rojo"],
			["#F28922","Naranjo"],
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
			context.fillStyle = array_concursantes[i][0];
			context.fill();

			context.save();
			
			}
		}

		function handleWin(winningSymbolNr){
			display.hidden = true;
    			display.innerHTML = array_concursantes[winningSymbolNr][1];
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