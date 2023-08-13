import { IBase } from "./base.interface";
import { IVideo } from "./video.interface";

export interface IUser extends IBase {
    name: string;
    email: string;
    isVerified?: boolean;
    subscribersCount: number;
    description: string;
    avatarPath: string;
    videos?: IVideo[];
    subscriptions: ISubscription[];
};

export interface ISubscription extends IBase {
    toChannel: IUser;
}