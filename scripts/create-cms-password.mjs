#!/usr/bin/env node
/**
 * Generate a salted scrypt password hash for Raffli CMS.
 * The password is never printed, sent online, saved, or passed as a process argument.
 * Usage: node scripts/create-cms-password.mjs
 */
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { stdin, stdout, exit } from 'node:process';

async function askHidden(prompt) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') {
    throw new Error('Run this script in an interactive terminal (PowerShell or VS Code Terminal).');
  }
  stdout.write(prompt);
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return await new Promise((resolve, reject) => {
    let value = '';
    const done = () => {
      stdin.off('data', onData);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write('\n');
    };
    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === '\u0003') {
          done();
          reject(new Error('Cancelled'));
          return;
        }
        if (char === '\r' || char === '\n') {
          done();
          resolve(value);
          return;
        }
        if (char === '\u0008' || char === '\u007f') {
          value = value.slice(0, -1);
          continue;
        }
        if (!/[\u0000-\u001f]/.test(char)) value += char;
      }
    };
    stdin.on('data', onData);
  });
}

try {
  const password = await askHidden('Choose a CMS password (min 16 characters; hidden): ');
  if (password.length < 16 || password.length > 256) {
    throw new Error('Password must be between 16 and 256 characters.');
  }
  const confirmation = await askHidden('Confirm password (hidden): ');
  const left = Buffer.from(password);
  const right = Buffer.from(confirmation);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    throw new Error('Passwords did not match.');
  }
  const salt = randomBytes(16).toString('hex');
  const digest = scryptSync(password, salt, 64).toString('hex');
  stdout.write('\nCopy ONLY the following value into Vercel as CMS_ADMIN_PASSWORD_HASH (Secret):\n');
  stdout.write(salt + ':' + digest + '\n');
  stdout.write('\nDo not paste your password or generated hash into GitHub or chat.\n');
} catch (e) {
  console.error('\n' + (e instanceof Error ? e.message : String(e)));
  exit(1);
}
