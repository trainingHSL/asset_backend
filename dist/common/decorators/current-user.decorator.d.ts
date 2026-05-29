export type JwtUser = {
    sub: number;
    type: 'organization' | 'user';
    organizationId: number;
    role: string;
    name: string;
    email: string;
};
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
