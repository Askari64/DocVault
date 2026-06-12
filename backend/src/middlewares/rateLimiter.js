import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redis } from "../config/redisClient.js";

import {
  userUploadKeyGenerator,
  orgUploadKeyGenerator,
  userDownloadKeyGenerator,
  orgDownloadKeyGenerator,
} from "../helpers/userKeyGenerartor.js";

import { createRateLimitHandler } from "../helpers/rateLimiterHandler.js";

/*
|--------------------------------------------------------------------------
| Redis Store Factory
|--------------------------------------------------------------------------
|
| express-rate-limit requires a UNIQUE RedisStore instance
| for every limiter.
|
| We are still using the SAME Redis server connection.
|
| RedisStore #1 -> User Upload Limiter
| RedisStore #2 -> Org Upload Limiter
| RedisStore #3 -> User Download Limiter
| RedisStore #4 -> Org Download Limiter
|
| All of them use the same Redis client.
|
*/
const createRedisStore = (prefix) =>
  new RedisStore({
    prefix,

    sendCommand: (...args) => redis.sendCommand(args),
  });

/*
|--------------------------------------------------------------------------
| Upload - User Limit
|--------------------------------------------------------------------------
|
| Redis Key Example:
|
| rl:user-upload:
|   upload:user:user_123:org:org_abc
|
| Prevents a single user from spamming uploads.
|
*/
export const userUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,

  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: userUploadKeyGenerator,

  store: createRedisStore("rl:user-upload:"),

  handler: createRateLimitHandler(
    "UPLOAD_RATE_LIMIT_EXCEEDED",
    "You have reached the upload limit for this organization.",
  ),
});

/*
|--------------------------------------------------------------------------
| Upload - Organization Limit
|--------------------------------------------------------------------------
|
| Redis Key Example:
|
| rl:org-upload:
|   upload:org:org_abc
|
| Prevents an entire organization from consuming
| excessive resources.
|
*/
export const orgUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 500,

  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: orgUploadKeyGenerator,

  store: createRedisStore("rl:org-upload:"),

  handler: createRateLimitHandler(
    "ORG_UPLOAD_LIMIT_EXCEEDED",
    "Your organization has reached its upload limit. Please try again later.",
  ),
});

/*
|--------------------------------------------------------------------------
| Download - User Limit
|--------------------------------------------------------------------------
|
| Redis Key Example:
|
| rl:user-download:
|   download:user:user_123:org:org_abc
|
*/
export const userDownloadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,

  limit: 50,

  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: userDownloadKeyGenerator,

  store: createRedisStore("rl:user-download:"),

  handler: createRateLimitHandler(
    "DOWNLOAD_RATE_LIMIT_EXCEEDED",
    "You have reached the download limit for this organization.",
  ),
});

/*
|--------------------------------------------------------------------------
| Download - Organization Limit
|--------------------------------------------------------------------------
|
| Redis Key Example:
|
| rl:org-download:
|   download:org:org_abc
|
*/
export const orgDownloadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,

  limit: 250,

  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: orgDownloadKeyGenerator,

  store: createRedisStore("rl:org-download:"),

  handler: createRateLimitHandler(
    "ORG_DOWNLOAD_LIMIT_EXCEEDED",
    "Your organization has reached its download limit. Please try again later.",
  ),
});
