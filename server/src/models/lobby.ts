import {
  getModelForClass,
  index,
  ModelOptions,
  mongoose,
  prop,
  Ref
} from '@typegoose/typegoose';
import { UserClass } from 'models/user';

@ModelOptions({ schemaOptions: { timestamps: true } })
@index(
  { createdAt: 1 },
  {
    // delete temporary lobbies after 2 days
    expireAfterSeconds: 60 * 60 * 24 * 2,
    partialFilterExpression: { temp: true }
  }
)
class LobbyClass {
  id!: mongoose.Types.ObjectId;
  _id!: mongoose.Types.ObjectId;

  // delete lobby if it is temporary
  @prop({ required: true, default: true, index: true })
  public temp!: boolean;

  @prop({ required: true })
  public lobbyType!: 'solo' | 'versus' | 'coop';

  // game of each player { 'User.id': 'Game.id' }
  @prop({ required: true, default: {} })
  public players!: mongoose.Schema.Types.Mixed;

  // ['User.id'] of spectators, mongodb does not support Set right now
  @prop({ required: true, default: [], ref: 'UserClass' })
  public spectators!: Ref<UserClass>[];
}

const LobbyModel = getModelForClass(LobbyClass);

export { LobbyClass };
export default LobbyModel;
