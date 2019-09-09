var background_c;
var line_c;

var isDraw; //ベジェアニメーションが始まったかどうか
var drawP; //実際に動く点
var boxP1,boxP2,boxP3; //box生成アニメーションの軸三本用の点
var rot; //回転角
var fpos; //開始地点
var offset = 20; //はみ出す部分のオフセット
var num = 4; //線の数

var pIndex = new Array();

var canvas;

var opening_finished; //オープニングが終了したか

class Point{
    constructor(_prepos,_pos){
      this.pos = createVector(_pos.x,_pos.y,_pos.z);
      this.prepos = createVector(_prepos.x,_prepos.y,_prepos.z);
      this.vel = createVector(0,0,0);
      
      this.C = createVector(0,0);
      this.center = createVector(random(fpos.x,-fpos.x),random(fpos.y,-fpos.y),random(fpos.z,-fpos.z)); //引力点
      this.axis = createVector(1,0);
      
      this.coreR = 0;
      
    }
    
    update(){
      console.log(opening_finished);
      if(this.pos.x>-fpos.x+offset || this.pos.x<fpos.x-offset 
      || this.pos.y>-fpos.y+offset || this.pos.y<fpos.y-offset 
      || this.pos.z>-fpos.z+offset || this.pos.z<fpos.z-offset)
      {
        opening_finished = true;
        $('.content').fadeIn(2000);
        
        return;
      }
      if(frameCount<181){
        var cv = p5.Vector.sub(this.center,this.pos);
        this.vel.add(cv.mult(0.01));
      }
      //else{
      //  PVector cv = PVector.sub(center,this.pos);
      //  this.vel.add(cv.mult(0.01));
      //}
      this.vel.limit(7);
      this.prepos.set(this.pos);
      this.pos.add(this.vel);
      var _p = new Point(this.prepos,this.pos);
      pIndex.push(_p);
      
      
      if(frameCount%30==0){
        this.center.set(random(fpos.x+offset,-fpos.x-offset),random(fpos.y+offset,-fpos.y-offset),random(fpos.z+offset,-fpos.z-offset));
        
      }
    }
    
    startBox(dir){
      if(this.pos.x>-fpos.x || this.pos.x<fpos.x || this.pos.y>-fpos.y || this.pos.y<fpos.y || this.pos.z>-fpos.z || this.pos.z<fpos.z){
        this.vel.set(0,0,0);
        if(!isDraw){
          drawP = new Point(fpos,fpos);
          isDraw = true;
        }
        
      }
      else{
        this.vel.set(dir);
        this.coreR +=1.1;
      }
        
      
      stroke(line_c);
      this.pos.add(this.vel);
      line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
      
      push();
      rotateX(PI);
      line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
      pop();
      
      push();
      rotateY(PI);
      line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
      pop();
      
      push();
      rotateZ(PI);
      line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
      pop();
      
      //球体
      //lights();
      //ambientLight(120, 60, 60); 
    //   lightSpecular(100, 100, 100); 
      //directionalLight(200, 200, 200, -1, 1, -1);  
    //   specular(255,0,0);
      noStroke();
      fill(142,29,67);
      sphere(this.coreR);
        
    }
    
    draw(){
      //noFill();
      strokeWeight(1);
     
      
        var R = p5.Vector.dist(this.pos,this.C);
        var a = this.axis.angleBetween(this.pos);
        var pos2 = createVector(R*cos(a+(2*PI/num)),-1*R*sin(a+(2*PI/num)));
        
        
        line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
        //line(this.pos.x,this.pos.y,pos2.x,pos2.y);
        bezier(this.pos.x,this.pos.y,this.pos.z,fpos.x,fpos.y,fpos.z,0,0,0,pos2.x,pos2.y,pos2.z);
        
        push();
        rotateX(PI);
        line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
        //line(this.pos.x,this.pos.y,pos2.x,pos2.y);
        bezier(this.pos.x,this.pos.y,this.pos.z,fpos.x,fpos.y,fpos.z,0,0,0,pos2.x,pos2.y,pos2.z);
        pop();
        
        push();
        rotateY(PI);
        line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
        //line(this.pos.x,this.pos.y,pos2.x,pos2.y);
        bezier(this.pos.x,this.pos.y,this.pos.z,fpos.x,fpos.y,fpos.z,0,0,0,pos2.x,pos2.y,pos2.z);
        pop();
        
        push();
        rotateZ(PI);
        line(this.prepos.x,this.prepos.y,this.prepos.z,this.pos.x,this.pos.y,this.pos.z);
        //line(this.pos.x,this.pos.y,pos2.x,pos2.y);
        bezier(this.pos.x,this.pos.y,this.pos.z,fpos.x,fpos.y,fpos.z,0,0,0,pos2.x,pos2.y,pos2.z);
        pop();
     
      
    }
  }

function canvasSetup(){
    background_c  = color(33,36,46);
    line_c = color(200,217,205);

    background(background_c);
    
    fpos = createVector(-200,-200,-200);
    
    
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    canvasSetup();
}


function setup(){
    canvas = createCanvas(windowWidth,windowHeight,WEBGL);
    canvas.style('z-index','-1');

    canvasSetup();

    isDraw = false;
    boxP1 = new Point(fpos,fpos);
    boxP2 = new Point(fpos,fpos);
    boxP3 = new Point(fpos,fpos);
    rot = 0;

    opening_finished = false;
}

function draw(){
  background(background_c);
  translate(width/2,height/2);
  camera(-1000*sin(rot),0,-1000*cos(rot),0,0,0,0,1,0);
  
  boxP1.startBox(createVector(6,0,0));
  boxP2.startBox(createVector(0,6,0));
  boxP3.startBox(createVector(0,0,6));
  
  
  
  noFill();
  stroke(line_c);
  if(isDraw){
    drawP.update();
    drawP.draw();
  }
  
  
  for(var i=0;i<pIndex.length;i++){
    pIndex[i].draw();
  }
    rot += 0.005;

    console.log(pIndex.length);
}

