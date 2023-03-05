/*
In this class we create next/prec buttons, their tweens and handle click event
by calling parent methods
*/

class myButtons {

    constructor(origin) { 
      //  
        this.myClass = origin;
        this.myStage = this.myClass.stage;
        this.rightTweenIn = null;
        this.rightTweenOut = null;

        this.rightButton = null;
        this.leftButton = null;
    
        this.createNextPrevButtons();
    }
/*
create the buttons as png image
*/
    createNextPrevButtons(){

        this.myStage.enableMouseOver();
        this.myStage.enableMouseOut;

        var button = new Image();
        //button.src = './button.png';
        button.crossOrigin = "Anonymous";
        button.src = 'https://cdn.jsdelivr.net/gh/mPublicPhotos/photURL/button.png';
        button.addEventListener("load", this.buttonLoad.bind(this));
   
    }

    /*
    Hndlebutton image load event
    */
    buttonLoad (event){
        this.rightButton = new createjs.Bitmap(event.target);
        this.rightButton.addEventListener('click', this.rightClick.bind(this));
        this.rightButton.x = this.myClass.frameProp.width + 10;
        this.rightButton.y = this.myClass.frameProp.height/2;

        this.leftButton = this.rightButton.clone();
        this.leftButton.rotation = 180;
        this.leftButton.x = 0;
        this.leftButton.y = this.leftButton.y + 40;
       
        this.myStage.addChild(this.rightButton);
        this.myStage.setChildIndex(this.rightButton,this.myClass.currentIndex + 1);//this.myStage.numChildren - 1);
        
        this.myStage.addChild(this.leftButton);
        this.myStage.setChildIndex(this.leftButton,this.myClass.currentIndex + 2);

        this.leftButton.addEventListener('click',this.leftClick.bind(this));
        
        createjs.Ticker.setFPS (50);
        createjs.Ticker.addEventListener("tick", this.myStage);

        this.myClass.canvas.addEventListener("mouseover",this.buttonMoveIn.bind(this));
        this.myClass.canvas.addEventListener("mouseout", this.buttonMoveOut.bind(this));
        
    }

    /*
    mouse over event also start the tweens
    */
    buttonMoveIn(event){  
        let rightEnd = this.myClass.frameProp.width - 35; 
        this.rightTweenIn = createjs.Tween.get(this.rightButton, {loop : false})
            .to ({x: rightEnd}, 1000, createjs.Ease.getPowInOut(1));
        //this.rightTweenOut.gotoAndPlay(1000); 
       // console.log(event);
        let leftEnd = 45;
        this.leftTweenIn = createjs.Tween.get(this.leftButton, {loop : false})
            .to ({x: leftEnd}, 1000, createjs.Ease.getPowInOut(1));
    }

    /*
    mouse out event
    */
    buttonMoveOut(event){  
        let rightEnd = this.myClass.frameProp.width; 
        this.rightTweenOut = createjs.Tween.get(this.rightButton, {loop : false})
            .to ({x: rightEnd + 10}, 500, createjs.Ease.getPowInOut(4));
        
        let leftEnd = 0;
        this.leftTweenIn = createjs.Tween.get(this.leftButton, {loop : false})
            .to ({x: leftEnd}, 1000, createjs.Ease.getPowInOut(4));

    }

    rightClick(event){
        this.myClass.showRight();
    }
    leftClick(event){
        this.myClass.showLeft();
    }

}
