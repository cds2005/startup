const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
function updateScores(newScore, scores) {
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

