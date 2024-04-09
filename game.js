class Button{
    constructor(el){
        this.el = el
    }
}


class Game{
    buttons;
    score;
    dmg;
    scoreAdd;
    health;
    standardHealth;
    upgrdValues;

    constructor(){
        this.score = 0;
        this.dmg = 1;
        this.scoreAdd = 1;
        this.health = 10;
        this.standardHealth = 10;
        this.buttons = new Map();
        this.upgrdValues = [1,1,1,1];
        document.querySelectorAll('.butbut').forEach((el) => {
              this.buttons.set(el.id, new Button(el));
          });
    }
    pressMain(button){
        this.updateHealth()
    }
    updateHealth(){
        this.health = this.health-this.dmg;

        if (this.health <1){
            this.score += this.scoreAdd;
            this.updateText("officialScore",this.score);
            this.health = this.standardHealth;
        }
        this.updateText("officialHealth",this.health)
    }
    updateText(id,x) {
        document.getElementById(id).textContent = x;
    }
    upgrd1(){
        if (this.score >= this.upgrdValues[0]**2){
            this.score = this.score-(this.upgrdValues[0]**2);
            this.updateText("officialScore", this.score);
            this.upgrdValues[0]+=1;
            this.updateText("upgrade1Cost",this.upgrdValues[0]**2)
            this.updateText("upgrade1Current",(this.upgrdValues[0]-1)*10)
        }
    }
    upgrd2(){
        if (this.score >= this.upgrdValues[1]**3){
            this.score = this.score-(this.upgrdValues[1]**3);
            this.updateText("officialScore", this.score);
            this.upgrdValues[1]+=1;
            this.dmg +=this.upgrdValues[1]**2
            this.updateText("upgrade2Cost",this.upgrdValues[1]**3)
            this.updateText("upgrade2Current",this.dmg)
        }
    }
    upgrd3(){
        if (this.score >= this.upgrdValues[1]**3){
            this.score = this.score-(this.upgrdValues[1]**3);
            this.updateText("officialScore", this.score);
            this.upgrdValues[1]+=1;
            this.dmg +=this.upgrdValues[1]**2
            this.updateText("upgrade2Cost",this.upgrdValues[1]**3)
            this.updateText("upgrade2Current",this.dmg)
        }
    }
    prestige(){

    }
    save(){

    }
    
}

const game = new Game();