#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ShineFoxStack } from '../lib/shine-fox-stack';

const app = new cdk.App();
new ShineFoxStack(app, 'ShineFoxStack');
