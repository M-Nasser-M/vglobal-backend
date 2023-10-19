import {
  GatewayVpcEndpointAwsService,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { ApplicationProtocol } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Bucket, RDS, Service, StackContext } from "sst/constructs";

export function strapiStack({ stack }: StackContext) {
  const sstVpc = new Vpc(stack, "sstVpc", {
    natGateways: 0,
    maxAzs: 2,
    enableDnsHostnames: true,
    enableDnsSupport: true,
    gatewayEndpoints: { s3: { service: GatewayVpcEndpointAwsService.S3 } },
    subnetConfiguration: [
      { name: `A-${SubnetType.PUBLIC}`, subnetType: SubnetType.PUBLIC },
      { name: `B-${SubnetType.PUBLIC}`, subnetType: SubnetType.PUBLIC },
      {
        name: `A-${SubnetType.PRIVATE_WITH_EGRESS}`,
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      },
      {
        name: `B-${SubnetType.PRIVATE_WITH_EGRESS}`,
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      },
    ],
    createInternetGateway: true,
    vpcName: "sstVpc",
  });

  const database = new RDS(stack, "Database", {
    engine: "postgresql13.9",
    defaultDatabaseName: "vglobal_sst",
    cdk: { cluster: { vpc: sstVpc } },
  });

  const bucket = new Bucket(stack, "upload_sst");

  const service = new Service(stack, "strapi_sst_vglobal", {
    path: ".",
    bind: [database, bucket],
    port: 1337,
    scaling: { cpuUtilization: 80, memoryUtilization: 80 },
    cdk: {
      vpc: sstVpc,
      applicationLoadBalancerTargetGroup: {
        port: 1337,
        protocol: ApplicationProtocol.HTTP,
      },
      container: {
        environment: {
          DATABASE_CLIENT: process.env.DATABASE_CLIENT,
          DATABASE_HOST: database.clusterEndpoint.hostname,
          DATABASE_PORT: `${database.clusterEndpoint.port}`,
          DATABASE_NAME: database.defaultDatabaseName,
          DATABASE_USERNAME: `${database.cdk.cluster.secret.secretValueFromJson(
            "username"
          )}`,
          DATABASE_PASSWORD: `${database.cdk.cluster.secret.secretValueFromJson(
            "password"
          )}`,
          DATABASE_SSL: process.env.DATABASE_SSL,
          CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
          CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
          CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
          STRAPI_ADMIN_LIVE_STRIPE_SECRET_KEY:
            process.env.STRAPI_ADMIN_LIVE_STRIPE_SECRET_KEY,
          STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY:
            process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY,
          SMTP_USERNAME: process.env.SMTP_USERNAME,
          SMTP_PASSWORD: process.env.SMTP_PASSWORD,
          SMTP_HOST: process.env.SMTP_HOST,
          SMTP_PORT: process.env.SMTP_PORT,
        },
      },
    },
  });

  stack.addOutputs({ ServiceUrl: service.url });
}
