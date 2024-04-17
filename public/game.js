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
        this.updateText("playerName",localStorage.getItem('username') ?? 'Anonymous');
    }

    pressMain(button){
        this.updateHealth();
    }

    updateHealth(){
        this.health = this.health-this.damage();

        if (this.health <1){
            this.score += Math.round((this.scoreAdd)*(1+((this.upgrdValues[0]-1)/10)));
            this.updateText("officialScore",this.score);
            this.health = this.standardHealth;
        }
        this.updateText("officialHealth",this.health);
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
            this.updateText("upgrade1Cost",this.upgrdValues[0]**2);
            this.updateText("upgrade1Current",(this.upgrdValues[0]-1)*10);
        }
    }

    upgrd2(){
        if (this.score >= this.upgrdValues[1]**3){
            this.score = this.score-(this.upgrdValues[1]**3);
            this.updateText("officialScore", this.score);
            this.upgrdValues[1]+=1;
            this.dmg +=this.upgrdValues[1]**2;
            this.updateText("upgrade2Cost",this.upgrdValues[1]**3);
            this.updateText("upgrade2Current",this.dmg);
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
        for(i = 0; i<upgrdValues[3];i++){
            this.score = 0;
            this.standardHealth = this.standardHealth*100;
            this.scoreAdd = this.scoreAdd*10;
        }
    }

    name(){
        return localStorage.getItem('username') ?? 'Anonymous';
    }
    async save() {
        const userName = this.getPlayerName();
        const date = new Date().toLocaleDateString();
        const newScore = {name: username, score: this.score, date: date, upgrdValues:this.upgrdValues};
    
        try {
          const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newScore),
          });
    
          // Store what the service gave us as the high scores
          const scores = await response.json();
          localStorage.setItem('scores', JSON.stringify(scores));
        } catch {
          // If there was an error then just track scores locally
          this.updateScoresLocal();
        }
      }
    updateScoresLocal(){
        const username = this.name();
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
        scores = JSON.parse(scoresText);
        }
        scores = this.updateUser(username, this.score, scores, this.upgrdValues);

        localStorage.setItem('scores', JSON.stringify(scores));
    }

    updateUser(username, score, scores, upgrdValues) {
        const date = new Date().toLocaleDateString();
        const newScore = { name: username, score: score, date: date, values: upgrdValues };
    
        let found = false;
        for (let i = 0; i < scores.length; i++) {
            if (scores[i].name === username) {
                // Update the existing score if it's higher than the previous one
                if (score > scores[i].score) {
                    scores[i].score = score;
                    scores[i].date = date;
                    scores[i].values = upgrdValues;
                }
                found = true;
                break;
            }
        }
    
        if (!found) {
            // If username not found, add the new score
            scores.push(newScore);
        }
    
        return scores;
    }
    }
    


const game = new Game();

setInterval(() => {
    const score = Math.floor(Math.random() * 3000);
    const chatText = document.querySelector('#ldbrd');
    chatText.innerHTML =
      `<div class="update"><span>Caleb Lawlor</span> scored ${score}</div>` +
      chatText.innerHTML;
  }, 1000);