export declare function hashPassword(plainPassword: string): Promise<string>;
export declare function validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
