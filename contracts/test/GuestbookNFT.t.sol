// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/GuestbookNFT.sol";

contract GuesbookTest is Test {
    BaseGuestbook public baseGuestbook;

    function setUp() public {
        baseGuestbook = new BaseGuestbook();
    }

    function test_mint() public {
        baseGuestbook.safeMint(
            0x0000000000000000000000000000000000000123,
            "test_entry"
        );

        baseGuestbook.safeMint(
            0x0000000000000000000000000000000000000123,
            "new entry"
        );

        assertEq(
            baseGuestbook.tokenURI(0),
            "https://baseguestbook.vercel.app/0?entry=test_entry"
        );
        assertEq(
            baseGuestbook.tokenURI(1),
            "https://baseguestbook.vercel.app/1?entry=new entry"
        );
    }

    function test_total_supply() public {
        assertEq(baseGuestbook.totalSupply(), 0);

        baseGuestbook.safeMint(
            0x0000000000000000000000000000000000000123,
            "new entry"
        );

        baseGuestbook.safeMint(
            0x0000000000000000000000000000000000000123,
            "new entry"
        );

        baseGuestbook.safeMint(
            0x0000000000000000000000000000000000000123,
            "new entry"
        );

        baseGuestbook.safeMint(
            0x0000000000000000000000000000000000000123,
            "new entry"
        );

        assertEq(baseGuestbook.totalSupply(), 4);
    }
}
