var crypto = require('crypto');

async function makeHash(a) {
    var shasum = crypto.createHash('sha256'); // shasum은 Hash 클래스의 인스턴스입니다.
    shasum.update(a);
    var output = shasum.digest('hex');
    return output;
};

export {makeHash};