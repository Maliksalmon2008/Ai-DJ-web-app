song1 = "";
rightwrist_x = 0;
rightwrist_y = 0;
score_rightwrist_x = 0;
score_leftwrist_y = 0;

leftwrist_x = 0;
leftwrist_y = 0;
function setup(){
canvas = createCanvas(350,350);
canvas.center();
video = createCapture(VIDEO);
video.size(350,350);
video.hide();

poseNet = ml5.poseNet(video,modelloaded);
poseNet.on("pose",getposes)

  
}

function preload(){
song1 = loadSound("music.mp3");


}



function Music(){
    song1.play();
    song1.setVolume(0.4);
    song1.rate(1);
    
}

function getposes(Results){
   console.log(Results);
   rightwrist_x =  Results[0].pose.rightWrist.x;
  rightwrist_y =  Results[0].pose.rightWrist.y;

  leftwrist_x =  Results[0].pose.leftWrist.x;
  leftwrist_y =  Results[0].pose.leftWrist.y;
  score_leftwrist_y = Results[0].pose.keypoints[9].score;
  score_rightwrist_x = Results[0].pose.keypoints[10].score;
}

function modelloaded(){
console.log("Model has loaded");
}

function draw(){
    image(video,0,0,350,350)
    fill("red");
    stroke("blue");
    if(score_leftwrist_y > 0.2){
    circle(leftwrist_x,leftwrist_y,20);
    
InNumberleftwrist_y = Number(leftwrist_y);
remove_decimals = floor(InNumberleftwrist_y);
volume = remove_decimals/500;
song1.setVolume(volume);
document.getElementById("volume_label").innerHTML = "Volume" + volume;
}

if(score_rightwrist_x > 0.2){
    circle(rightwrist_x,rightwrist_y,20);
    if(rightwrist_y >0 && rightwrist_y <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
song1.rate(0.5);
    }
    else if(rightwrist_y >100 && rightwrist_y <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song1.rate(1);
    }
    else if(rightwrist_y >200 && rightwrist_y <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song1.rate(1.5);
    }
    else if(rightwrist_y >300 && rightwrist_y <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song1.rate(2);
    }
    else if(rightwrist_y >400 && rightwrist_y <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song1.rate(2.5);
    }
}

}