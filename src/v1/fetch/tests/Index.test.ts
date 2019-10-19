import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../src/Index';
import { NotificationRepository } from '../src/repositories/NotificationRepository';

describe('Fetch Notifications Handler tests', () => {
    it('Successfully Fetch Notifications', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: 'string',
            pathParameters:null,
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

        NotificationRepository.prototype.query = jest.fn().mockImplementationOnce(
            async (userId:string) => {
                console.log(`${userId}`);
                return [{
                        Id: 'Id',
                        Title: 'Title'
                    },
                    {
                        Id:  'Id1',
                        Title: 'Title1'
                    }]
            });

        // @ts-ignore
        const response = await handler(event, context, {});

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).data).toHaveLength(2);
    });
    it('Unsuccessfully Fetch Notifications', async () => {
        const event:APIGatewayProxyEvent = {
            body:null,
            headers: {
                ['']: 'string'
            },
            multiValueHeaders: { ['']:[''] },
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: 'string',
            pathParameters:null,
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

        NotificationRepository.prototype.query = jest.fn().mockImplementationOnce(
            async (userId:string) => {
                console.log(`${userId}`);
                return null;
            });

        // @ts-ignore
        const response = await handler(event, context, {});

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).data).toStrictEqual([]);
    });
});