import {
  DocumentType,
  getModelForClass,
  mongoose,
  prop,
  Ref
} from '@typegoose/typegoose';
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
type UserDocument = DocumentType<UserClass>;

async function findUser(id: string | mongoose.Types.ObjectId | undefined) {
  if (!id) return null;
  try {
    return await UserModel.findById(id).exec();
  } catch (err) {
    return null;
  }
}

export { UserClass, UserDocument, findUser };
export default UserModel;
