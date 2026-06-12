import { getAuth } from "@clerk/express";

/*
|--------------------------------------------------------------------------
| Upload Rate Limit Keys
|--------------------------------------------------------------------------
|
| User Upload Bucket
| Example:
| upload:user:user_123:org:org_abc
|
| Alice gets 20 uploads/hour in Org A
| Alice gets another 20 uploads/hour in Org B
|
*/
export const userUploadKeyGenerator = (req) => {
  const auth = getAuth(req);

  if (!auth.userId || !auth.orgId) {
    throw new Error("Authenticated organization required");
  }

  return `upload:user:${auth.userId}:org:${auth.orgId}`;
};

/*
|--------------------------------------------------------------------------
| Organization Upload Bucket
|--------------------------------------------------------------------------
|
| Example:
| upload:org:org_abc
|
| Entire organization shares this bucket.
| Protects your infrastructure costs.
|
*/
export const orgUploadKeyGenerator = (req) => {
  const auth = getAuth(req);

  if (!auth.orgId) {
    throw new Error("Authenticated organization required");
  }

  return `upload:org:${auth.orgId}`;
};

/*
|--------------------------------------------------------------------------
| Download Rate Limit Keys
|--------------------------------------------------------------------------
|
| User Download Bucket
|
*/
export const userDownloadKeyGenerator = (req) => {
  const auth = getAuth(req);

  if (!auth.userId || !auth.orgId) {
    throw new Error("Authenticated organization required");
  }

  return `download:user:${auth.userId}:org:${auth.orgId}`;
};

/*
|--------------------------------------------------------------------------
| Organization Download Bucket
|--------------------------------------------------------------------------
|
| Entire organization download bucket.
|
*/
export const orgDownloadKeyGenerator = (req) => {
  const auth = getAuth(req);

  if (!auth.orgId) {
    throw new Error("Authenticated organization required");
  }

  return `download:org:${auth.orgId}`;
};
