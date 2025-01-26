// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Cert is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    struct Certificate {
        string name;
        string course;
        string grade;
        string date;
    }

    mapping(uint256 => Certificate) public certificates;

    event CertificateIssued(uint256 certificateId, string issueDate);
    event CertificateRevoked(uint256 certificateId);

    function issue(
        uint256 _id,
        string memory _name,
        string memory _course,
        string memory _grade,
        string memory _date
    ) public onlyOwner {
        require(bytes(certificates[_id].name).length == 0, "Certificate already exists");
        certificates[_id] = Certificate(_name, _course, _grade, _date);
        emit CertificateIssued(_id, _date);
    }

    function revoke(uint256 _id) public onlyOwner {
        require(bytes(certificates[_id].name).length != 0, "Certificate does not exist");
        delete certificates[_id];
        emit CertificateRevoked(_id);
    }
}
