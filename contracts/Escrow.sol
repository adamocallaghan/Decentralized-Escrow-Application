// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	// The 3 multisig approvers
	address public multisig0;
	address public multisig1;
	address public multisig2;

	address public beneficiary;
	address public depositor;

	bool[] public approvals; // to store our approvals-to-date

	bool public isApproved;

	constructor(address _multisig0, address _multisig1, address _multisig2, address _beneficiary) payable {
		multisig0 = _multisig0;
		multisig1 = _multisig1;
		multisig2 = _multisig2;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == multisig0 || msg.sender == multisig1 || msg.sender == multisig2);
		approvals.push(true);
		require(approvals.length >= 1, "Additional approvals required");
		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}
}
