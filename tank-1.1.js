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

	this.shot = function(){
		switch(this.direct){
				case 0:
					var bulletX=this.x, bulletY=this.y+10;
				case 1:
					var bulletX=this.x+10, bulletY=this.y;
				case 2:
					var bulletX=this.x+30, bulletY=this.y+10;
				case 3:
					var bulletX=this.x+10, bulletY=this.y+30;
		}
		var bullet = new Bullet(bulletX,bulletY,this.direct,'hero',this);
		heroBullets.push(bullet);
		var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
			//把这个timer赋给这个子弹(js对象是引用传递!)
		heroBullets[heroBullets.length-1].timer=timer;
		
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

/**
 * 子弹类
 * @param direct 子弹的方向
 * @param speed 子弹的速度 默认为1
 * @param type 子弹属于敌人的还是自己的
 * @param tank 子弹属于哪个坦克 
 */
function Bullet(x,y,direct,speed,type,tank){
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.speed = (typeof speed != "number")? 1 : speed <=0 ? 1 : speed;
	this.type = type;
	this.tank = tank;

	this.timer = null;

	this.run = function (){
		switch(this.direct){
			case 0:
				this.x -= this.speed;break;
			case 1:
				this.y -= this.speed;break;
			case 2:
				this.x += this.speed;break;
			case 3:
				this.y += this.speed;break;
			default:
				break;
		}
	}
}

function drawBullet(bullet){
	if(!arguments[0]){		//画出所有bullet
		var len = heroBullets.length;
		for(var i=0;i<len;i++){
			$('#test').text(len);
			var heroBullet = heroBullets[i];
			tankMap.fillStyle = '#FEF26E';
			tankMap.fillRect(heroBullet.x, heroBullet.y, 2, 2);
		}
			tankMap.fill();
	}else if(bullet instanceof Bullet){	//画出刚出来的bullet
		tankMap.fillStyle = '#FEF26E';
		tankMap.fillRect(bullet.x, bullet.y, 2, 2);
		tankMap.fill();
	}

}