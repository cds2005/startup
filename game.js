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
        this.updateText("playerName",localStorage.getItem("username"))
    }

    pressMain(button){
        this.updateHealth()
    }

    updateHealth(){
        this.health = this.health-this.damage();

        if (this.health <1){
            this.score += Math.round((this.scoreAdd)*(1+((this.upgrdValues[0]-1)/10)));
            this.updateText("officialScore",this.score);
            this.health = this.standardHealth;
        }
        this.updateText("officialHealth",this.health)
    }

    updateText(id,x) {
        document.getElementById(id).textContent = x;
    }

    damage(){
        return Math.round(this.dmg*(1+this.upgrdValues[1]/10));
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
        if (this.score >= this.upgrdValues[2]**2){
            this.score = this.score-(this.upgrdValues[2]**2);
            this.updateText("officialScore", this.score);
            this.updateText("upgrade3Current",this.upgrdValues[2]*10);
            this.upgrdValues[2]+=1;
            this.updateText("upgrade3Cost",this.upgrdValues[2]**2);
        }
    }

    prestige(){
        this.score = 0;
        this.standardHealth = this.standardHealth*100;
        this.scoreAdd = this.scoreAdd*10;
    }

    name(){
        return localStorage.getItem('username') ?? 'Anonymous';
    }

    save(){

    }
    
}

const game = new Game();