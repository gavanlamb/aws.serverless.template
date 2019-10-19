import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../src/Index';
import { NotificationRepository } from '../src/repositories/NotificationRepository';

describe('Delete Notification Handler tests', () => {
    process.env.TableName = 'test-table';

    it('Missing notification id', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'DELETE',
            isBase64Encoded: false,
            path: 'string',
            pathParameters:{},
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
        expect(JSON.parse(response.body).errors.status).toBe('400');
        expect(JSON.parse(response.body).errors.code).toBe('notv1-dt-nid');
        expect(JSON.parse(response.body).errors.title).toBe('Invalid Notification Id');
        expect(JSON.parse(response.body).errors.detail).toBe('Notification Id is not set');
        expect(JSON.parse(response.body).errors.source.parameter).toBe('notificationId');
    });

    it('Unsuccessfully delete Notification', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'DELETE',
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

        NotificationRepository.prototype.delete = jest.fn().mockImplementationOnce(
            async (notificationId:string, userId:string) => {
                console.log(`${notificationId}-${userId}`);
                return false;
            });

        // @ts-ignore
        const response = await handler(event, context, {});

        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body).errors.status).toBe('404');
        expect(JSON.parse(response.body).errors.code).toBe('notv1-dt-not-del-err');
        expect(JSON.parse(response.body).errors.title).toBe('Notification not found');
        expect(JSON.parse(response.body).errors.detail).toBe('Notification not found:0123456789');
    });

    it('Successfully delete Notification', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'DELETE',
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

        NotificationRepository.prototype.delete = jest.fn().mockImplementationOnce(
            async (notificationId:string, userId:string) => {
                console.log(`${notificationId}-${userId}`);
                return true;
            });

        // @ts-ignore
        const response = await handler(event, context, {});

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).data).toBe(true);
    });
});