// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

contract BaseGuestbook is ERC721, ERC721Enumerable, Ownable {
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

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        // should return the url which consist of baseURI + tokenId + entry
        // e.g. https://baseguestbook.vercel.app/0?entry=Hello%20World

        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Strings.toString(tokenId),
                    "?entry=",
                    _entries[tokenId]
                )
            );
    }
}
