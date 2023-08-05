// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/Counters.sol";

contract BaseGuestbook is ERC721, Ownable {
    using Counters for Counters.Counter;

    mapping(uint256 => string) private _entries;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BaseGuestbook", "GBG") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://baseguestbook.vercel.app/";
    }

    function safeMint(address to, string memory entry) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _entries[tokenId] = entry;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public {
        // should return the url which consist of baseURI + tokenId + entry
        // e.g. https://baseguestbook.vercel.app/0?entry=Hello%20World
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    tokenId,
                    "?entry=",
                    _entries[tokenId]
                )
            );
    }
}
