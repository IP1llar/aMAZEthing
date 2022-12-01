import { mongoose } from './index';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  minions: {
    type: Number,
  },
  result: {
    type: String,
  },
  gold: {
    type: Number,
  },
  opponentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  towers: {
    type: Number,
  },
  startedAt: {
    type: Date,
  },
  duration: {
    type: Date,
  },
});

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: ' ',
  },
  sortLessons: {
    type: [Boolean],
  },
  totalGold: {
    type: Number,
    default: 0,
  },
  pathLessons: {
    type: [Boolean],
  },
  games: [gameSchema],
  overallWins: {
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    draws: {
      type: Number,
      default: 0
    }
  },
  avatar:{
    type: String,
    default: 'monkey.png',
    require:true
  }
})
const User = mongoose.model('User', userSchema)

export { User };
