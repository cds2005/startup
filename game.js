class Button{
    constructor(el){
        this.el = el
    }
}


class Game{
    buttons;
    score;
    constructor(){
        this.score = 0;
        this.buttons = new Map();
        document.querySelectorAll('.butbut').forEach((el) => {
              this.buttons.set(el.id, new Button(el));
          });
    }
    press(button){
        this.score++;
        this.updateScore(score)
    }
    updateScore() {
        const scoreEl = document.getElementById('officialScore');
        scoreEl.textContent = this.score;
    }
    
}

const game = new Game();