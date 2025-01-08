// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageStorage {
    struct Image {
        string imageHash;
        address signer;
        string signature;
    }

    mapping(string => Image) public imageRecords;

    function storeImage(string memory imageHash, string memory signature) public {
        imageRecords[imageHash] = Image(imageHash, msg.sender, signature);
    }

    function verifyImage(string memory imageHash) public view returns (address signer, string memory signature) {
        Image memory image = imageRecords[imageHash];
        return (image.signer, image.signature);
    }
}