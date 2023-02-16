// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ProofOfChallenge {
    uint numberOfChallenges;
    Challenge[] public challenges;

    struct Challenge{
        uint id;
        string cid;
        bool isChallengeAccept;
        address from;
        address to;
    }

    event ChallengeCreated(uint id, string cid, address from, address to);

    constructor() {}

    function sendChallenge(string calldata cid, address to) external {
        numberOfChallenges++;
        challenges.push(Challenge(numberOfChallenges, cid, false, msg.sender, to));
        emit ChallengeCreated(numberOfChallenges, cid, msg.sender, to);
    }

    function acceptChallenge(uint id) external {
        challenges[id].isChallengeAccept = true;
    }

    function getChallenges() external view returns (Challenge[] memory) {
        return challenges;
    }
}