const KJUR = require("jsrsasign");
// https://www.npmjs.com/package/jsrsasign

export function generateSignature(meetingNumber: string) {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID,
    appKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID,
    mn: meetingNumber,
    role: 0,
    iat: iat,
    exp: exp,
    tokenExp: exp,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    process.env.NEXT_PUBLIC_ZOOM_CLIENT_SECRET
  );
  return sdkJWT;
}
