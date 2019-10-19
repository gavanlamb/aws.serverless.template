import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../src/Index';
import { NotificationRepository } from '../src/repositories/NotificationRepository';

describe('Notification Handler tests', () => {
    it('Unsuccessfully get Notification - missing notificationId', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: 'string',
            pathParameters: null,
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            resource: '',
            requestContext: {
                authorizer:{
                    claims:{
                        sub: 'username'
                    }
                },
                accountId: '',
                apiId: '',
                httpMethod: '',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '',
                stage: '',
                requestId: '',
                requestTimeEpoch: 0,
                resourceId: '',
                resourcePath: '',
            }
        };

        const context = {
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'string',
            functionVersion: 'string',
            invokedFunctionArn: 'string',
            memoryLimitInMB: 'string',
            awsRequestId: 'string',
            logGroupName: 'string',
            logStreamName: 'string',
            identity: {},
            clientContext: {}
        };

        // @ts-ignore
        const response = await handler(event, context, {});

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body).errors[0].status).toBe('400');
        expect(JSON.parse(response.body).errors[0].code).toBe('notv1-gt-nid');
        expect(JSON.parse(response.body).errors[0].title).toBe('Notification Id not found');
        expect(JSON.parse(response.body).errors[0].detail).toBe('Notification Id not found');
        expect(JSON.parse(response.body).data).toStrictEqual(undefined);
    });
    it('Unsuccessfully get Notification', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: 'string',
            pathParameters:{
                ['notificationId']:'0123456789'
            },
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            resource: '',
            requestContext: {
                authorizer:{
                    claims:{
                        sub: 'username'
                    }
                },
                accountId: '',
                apiId: '',
                httpMethod: '',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '',
                stage: '',
                requestId: '',
                requestTimeEpoch: 0,
                resourceId: '',
                resourcePath: '',
            }
        };

        const context = {
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'string',
            functionVersion: 'string',
            invokedFunctionArn: 'string',
            memoryLimitInMB: 'string',
            awsRequestId: 'string',
            logGroupName: 'string',
            logStreamName: 'string',
            identity: {},
            clientContext: {}
        };

        NotificationRepository.prototype.get = jest.fn().mockImplementationOnce(
            async (notificationId: string, userId:string) => {
                console.log(`${notificationId}-${userId}`);
                return null;
            });

        // @ts-ignore
        const response = await handler(event, context, {});

        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body).errors[0].status).toBe('404');
        expect(JSON.parse(response.body).errors[0].code).toBe('notv1-gt-not-nf');
        expect(JSON.parse(response.body).errors[0].title).toBe('Notification not found');
        expect(JSON.parse(response.body).errors[0].detail).toBe('Notification not found:0123456789');
        expect(JSON.parse(response.body).data).toStrictEqual(undefined);
    });
    it('Successfully get Notification', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: 'string',
            pathParameters:{
                ['notificationId']:'0123456789'
            },
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            resource: '',
            requestContext: {
                authorizer:{
                    claims:{
                        sub: 'username'
                    }
                },
                accountId: '',
                apiId: '',
                httpMethod: '',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '',
                stage: '',
                requestId: '',
                requestTimeEpoch: 0,
                resourceId: '',
                resourcePath: '',
            }
        };

        const context = {
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'string',
            functionVersion: 'string',
            invokedFunctionArn: 'string',
            memoryLimitInMB: 'string',
            awsRequestId: 'string',
            logGroupName: 'string',
            logStreamName: 'string',
            identity: {},
            clientContext: {}
        };

        NotificationRepository.prototype.get = jest.fn().mockImplementationOnce(
            async (notificationId: string, userId: string) => {
                console.log(`${notificationId}-${userId}`);
                return {
                    title: "Title",
                    id: "ID",
                    body:"Body",
                    createdDate:"date"
                };
            });

        // @ts-ignore
        const response = await handler(event, context, {});

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).data.body).toStrictEqual('Body');
        expect(JSON.parse(response.body).data.createdDate).toStrictEqual('date');
        expect(JSON.parse(response.body).data.id).toStrictEqual('ID');
        expect(JSON.parse(response.body).data.title).toStrictEqual('Title');
    });
});