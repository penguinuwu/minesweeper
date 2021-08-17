import { getModelForClass, mongoose, prop, Ref } from '@typegoose/typegoose';
import { LobbyClass } from 'models/lobby';

class UserClass {
  id!: mongoose.Types.ObjectId;
  _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public username!: string;

  @prop({ required: false })
  public email?: string;

  @prop({ required: true })
  public hash!: string;

  // user's lobbies ["Lobby.id"]
  @prop({ required: true, default: [], ref: 'LobbyClass' })
  public lobbies!: Ref<LobbyClass>[];

  // user's past ["Lobby.id"]
  @prop({ required: true, default: [], ref: 'LobbyClass' })
  public pastLobbies!: Ref<LobbyClass>[];
}

const UserModel = getModelForClass(UserClass);

export { UserClass };
export default UserModel;
