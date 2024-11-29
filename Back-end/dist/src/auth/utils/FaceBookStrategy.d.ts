import { Profile } from 'passport-facebook';
import { VerifyCallback } from 'passport-google-oauth20';
declare const FacebookStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class FacebookStrategy extends FacebookStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any>;
}
export {};
