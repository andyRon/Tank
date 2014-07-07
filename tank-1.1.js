//普通坦克类,(x,y)为左上点
function Tank(x, y, direct, color){
	this.x = x;
	this.y = y;
	this.color = color;
	this.speed = 2;
	this.direct = direct;

	this.moveup = function(){
		this.y -= this.speed;
		this.direct = 1;
	};
	this.movedown = function(){
		this.y += this.speed;
		this.direct = 3;
	};
	this.moveleft = function(){
		this.x -= this.speed;
		this.direct = 0;
	};
	this.moveright = function(){
		this.x += this.speed;
		this.direct = 2;
	}
}

function drawTank(tank){
	var tireW = 5,	//轮胎
		tireL = 30,
		bodyW = 10,	//坦克主体部分
		bodyL = 15,
		turret = 4.8, //坦克炮塔半径
		d = tank.direct;
	switch(d){
		case 1:
		case 3:
		default:
			tankMap.fillStyle = "#B1B100";
			tankMap.fillRect(tank.x, tank.y, tireW, tireL);
			tankMap.fillRect(tank.x+tireW+bodyW, tank.y, tireW, tireL);
			tankMap.fillRect(tank.x+tireW, tank.y+(tireL-bodyL)/2, bodyW, bodyL);
			tankMap.fillStyle = "#FFFF00";
			tankMap.arc(tank.x+tireW+bodyW/2, tank.y+tireL/2, turret, 0, Math.PI*2, false);
			tankMap.fill();

			tankMap.lineWidth = 1.5;
			tankMap.strokeStyle = "#FFFF00";
			tankMap.beginPath();
			tankMap.moveTo(tank.x+tireW+bodyW/2,tank.y+tireL/2);

			if(d == 1 || $.inArray(d, [0,1,2,3]) == -1){
				tankMap.lineTo(tank.x+tireW+bodyW/2, tank.y);
			}else if(d == 3){
				tankMap.lineTo(tank.x+tireW+bodyW/2, tank.y+tireL);
			}
					
			tankMap.closePath();
			tankMap.stroke();
			break;
		case 0:
		case 2:
			tankMap.fillStyle = "#B1B100";
			tankMap.fillRect(tank.x, tank.y, tireL, tireW);
			tankMap.fillRect(tank.x, tank.y+tireW+bodyW, tireL, tireW);
			tankMap.fillRect(tank.x+(tireL-bodyL)/2, tank.y+tireW, bodyL, bodyW);
			tankMap.fillStyle = "#FFFF00";
			tankMap.arc(tank.x+tireL/2, tank.y+tireW+bodyW/2, turret, 0, Math.PI*2, false);
			tankMap.fill();

			tankMap.lineWidth = 1.5;
			tankMap.strokeStyle = "#FFFF00";
			tankMap.beginPath();
			tankMap.moveTo(tank.x+tireL/2,tank.y+tireW+bodyW/2);

			if(d == 0){
				tankMap.lineTo(tank.x, tank.y+tireW+bodyW/2);
			}else if(d == 2){
				tankMap.lineTo(tank.x+tireL, tank.y+tireW+bodyW/2);
			}
					
			tankMap.closePath();
			tankMap.stroke();
			break;

	}

}