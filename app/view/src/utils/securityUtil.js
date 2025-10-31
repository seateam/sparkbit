import CryptoJS from 'crypto-js';
import NodeRSA from 'node-rsa';


const pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnsyw0le02Yu4ECwRxxfexDx461Ot7HQCehN6hxgB/axqTEuQtUJ7vH7Y3AG0kSfMvw9WAoAR4AV0tuEtxBtL1t3lwQlcIIGvVhRIjLwolRck21U3V5JoOFbBi7keQI7K0sSchaNUYnHUuMozN1Os1z+aCdYAQkndZxhhh2Eq4rQIDAQAB';

/**
 * 获取随机字符串并用base64编码
 * @param n 随机字符串长度
 * @return {string} base64编码字符串
 */
function getKey(n) {
  const chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  if (n == null) {
    n = 8;
  }
  let res = '';
  for (let i = 0; i < n; i++) {
    const id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return CryptoJS.enc.Base64.parse(res).toString();
}

/**
 * RSA公钥解密
 * @param text  经过RSA加密过的base64编码字符串
 * @return {string} 解密后的字符串
 */
function rsaDecrypt(text) {
  const rsa = new NodeRSA(pubKey, 'public');
  rsa.setOptions({ encryptionScheme: 'pkcs1' });
  return rsa.decryptPublic(text, 'utf8');
}

/**
 * RSA公钥加密
 * @param text 字符串
 * @return {string} 经过RSA加密过的base64编码字符串
 */
function rsaEncrypt(text) {
  const rsa = new NodeRSA(pubKey, 'public');
  rsa.setOptions({ encryptionScheme: 'pkcs1' });
  return rsa.encrypt(text, 'base64');
}

/**
 * AES解密
 * @param data 经过AES加密的base64编码字符串
 * @param key  Base64编码的密钥
 * @return {string} 解密后的字符串
 */
function aesDecrypt(data, key) {
  const keys = CryptoJS.enc.Base64.parse(key);
  const decrypt = CryptoJS.AES.decrypt(data, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}


/**
 * AES加密
 * @param data    加密字符串
 * @param keyStr  Base64编码的密钥(可以自定义)
 * @return {string} 返回AES加密过的Base64编码字符串
 */
function aesEncrypt(data, keyStr) {
  const key = CryptoJS.enc.Base64.parse(keyStr);
  const str = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}


/**
 * 解密
 * @param content  内容
 * @param sign     签名
 * @return {string} 解密后的字符串
 */
function decrypt(content, sign) {
  const key = rsaDecrypt(sign);
  return aesDecrypt(content, key);
}

/**
 * 加密
 * @param content 加密对象
 * @return {{data: string, sign: string}} data 加密后的数据，sign加密后的AES密钥
 */
function encrypt(content) {
  const keys = getKey(15);
  const data = aesEncrypt(JSON.stringify(content), keys);
  const key = rsaEncrypt(keys);
  return { data, key };
}

/**
 * 生成签名
 * @param {Object} body 参数 例如：{id: 1, name: 'aa'}
 * @param {Number} timestamp 时间戳
 * @param {String} api       接口名称
 * @return {string | false} 加密后字符串
 */
function sign(body, timestamp, api) {
  let str = body;
  if (body instanceof Object) {
    str = JSON.stringify(body);
  }
  let temp = str + timestamp;
  if (api) {
    temp += api;
  }
  const md5 = CryptoJS.MD5(temp).toString();
  return rsaEncrypt(md5);
}

export {
  decrypt,
  encrypt,
  sign,
  // getKey,
  // rsaDecrypt,
  // rsaEncrypt,
  // aesDecrypt,
  // aesEncrypt
};
