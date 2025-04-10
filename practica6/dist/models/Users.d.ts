import mongoose from "mongoose";
interface IUser {
    name: string;
    email: string;
    password: string;
    username: string;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, mongoose.Document<unknown, any, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUser>> & mongoose.FlatRecord<IUser> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
