#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'monocdk';
import { ShineFoxStack } from '../lib/shine-fox-stack';

const app = new App();
new ShineFoxStack(app, 'ShineFoxStack');
