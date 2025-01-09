// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SignatureStorage {
    // 定义一个结构体来存储签名数据
    struct SignatureInfo {
        string hash;
        string signature;
        address userAddress;
        uint256 accountIndex;
        uint256 timestamp;
    }

    // 使用映射将哈希值与签名信息关联
    mapping(string => SignatureInfo) public signatures;

    // 事件，存储签名信息时触发
    event SignatureStored(
        string hash,
        string signature,
        address userAddress,
        uint256 accountIndex,
        uint256 timestamp
    );

    // 存储签名到区块链
    function storeSignature(
        string memory hash,
        string memory signature,
        address userAddress,
        uint256 accountIndex
    ) public {
        // 存储签名信息
        signatures[hash] = SignatureInfo({
            hash: hash,
            signature: signature,
            userAddress: userAddress,
            accountIndex: accountIndex,
            timestamp: block.timestamp
        });

        // 触发事件，通知区块链上的存储
        emit SignatureStored(hash, signature, userAddress, accountIndex, block.timestamp);
    }

    // 获取签名信息
    function getSignature(string memory hash) public view returns (SignatureInfo memory) {
        return signatures[hash];
    }
}