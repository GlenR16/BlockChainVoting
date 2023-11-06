//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;

error _CandidateAlreadyExists();
error _AlreadyVoted();

contract BlockchainVoting {
    struct Voter {
        string name;
        address voterAddress;
        address _CandidateAddress;
    }

    struct Candidate {
        string name;
        address _CandidateAddress;
        uint256 votes;
    }

    Voter[] voters;
    Candidate[] Candidates;

    function StandAsCandidate(
        address _Address,
        string memory _name
    ) public {
        for (uint256 i = 0; i < Candidates.length; i++) {
            if (Candidates[i]._CandidateAddress == _Address) {
                revert _CandidateAlreadyExists();
            } else {}
        }
        Candidates.push(Candidate(_name, _Address, 0));
    }

    function Vote(
        string memory _name,
        address _voterAddress,
        address _CandidateAddress
    ) public {
        for (uint256 i = 0; i < voters.length; i++) {
            if (
                voters[i].voterAddress == _voterAddress
            ) {
                revert _AlreadyVoted();
            }
        }

        for (uint i = 0; i < Candidates.length; i++) {
            if (Candidates[i]._CandidateAddress == _CandidateAddress) {
                Candidates[i].votes++;
                voters.push(
                    Voter(_name, _voterAddress, _CandidateAddress)
                );
            }
        }
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return Candidates;
    }

    function getVoters() public view returns (Voter[] memory) {
        return voters;
    }
}
