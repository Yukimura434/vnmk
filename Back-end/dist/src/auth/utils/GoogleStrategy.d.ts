import { Profile, VerifyCallback } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void>;
}
export {};
