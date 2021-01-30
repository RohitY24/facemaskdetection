let mobilenet;
let classifier;
let video;
let label = 'Model training required';
let vidonbtn, maskonbtn, maskoffbtn, trainbtn, savebtn;

function modelReady() {
  console.log('Model is ready!!!');
classifier.load('model.json', customModelReady);
}

// function customModelReady() {
//   console.log('Custom Model is ready!!!');
//   label = 'model ready';
//   classifier.classify(gotResults);
// }

function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
  var cnv = createCanvas(720, 560); //600,500
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  video = createCapture(VIDEO);
  video.hide();
  background(0);
  vidonbtn = createButton('Enable Video Input');
  vidonbtn.position(x+280,620);
  vidonbtn.mousePressed(function() {
    video.play();
});
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  maskonbtn = createButton('Mask worn');
  maskonbtn.mousePressed(function() {
    classifier.addImage('Mask worn');
  });

  maskoffButton = createButton('Mask not worn');
  maskoffButton.mousePressed(function() {
    classifier.addImage('Mask not worn');
  });

  trainbtn = createButton('Train');
  trainbtn.mousePressed(function() {
    classifier.train(whileTraining);
  });

  savebtn = createButton('Save');
  savebtn.mousePressed(function() {
    classifier.save();
  });
 }



function draw() {
  background(0);
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, 720, 520);
  pop();
  
  fill(255);
  textSize(25);
  text(label, 250, height - 8);
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // label = result;
    label = result[0].label;
    classifier.classify(gotResults);
  }
}
