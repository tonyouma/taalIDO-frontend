export const mapConfig = {
  apiGoogle: process.env.REACT_APP_MAP_GOOGLE,
  apiMapBox: process.env.REACT_APP_MAP_MAPBOX
};

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const cloudinaryConfig = {
  cloudinaryKey: process.env.REACT_APP_CLOUDINARY_KEY,
  cloudinaryPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
  cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL
};

export const infuraApiKey = 'fbb83d21738f48d7bccfc214aa014f75';
export const infuraChainId = 'rinkeby';

export const targetNetwork = '0x4';
export const targetNetworkMsg =
  'Rinkeby 테스트 네트워크가 선택되지 않았습니다.';

export const admin = {
  addresses: [
    '0x3AeFa0a9222D69B535EA0A2fAE25768De8c9BBd1',
    '0x623C74254371730Ec947CBFb706659F0675A5ff6',
    '0xa42f6EE885e29a6915269B34e249f2a1c0A26955',
    '0x8f6EE14BaDa5c01f4717503EC7102A77d5d58026',
    '0x19922f6D6D3a203cBa4dD6fEBefe18BDc036C674',
    '0xD77f21211405a10f169d48ac729f70Edfcb41075'
  ]
};

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
