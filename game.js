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
    constructor(){
        this.score = 0;
        this.dmg = 1;
        this.scoreAdd = 1;
        this.health = 10;
        this.standardHealth = 10;
        this.buttons = new Map();
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

    }
    upgrd2(){

    }
    upgrd3(){

    }
    upgrd4(){

    }
    prestige(){

    }
    
}

const game = new Game();