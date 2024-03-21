// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IEEMT {
    // Event definition
    event EventLog(address indexed from, string sub, uint256 time, string data);

    // Function to change admin
    function changeAdmin(address newAdmin) external;

    // Function to add an allowed sender
    function addAllowedSender(address _sender) external;

    // Function to remove an allowed sender
    function removeAllowedSender(address _sender) external;

    // Function to emit an event
    function emitEvent(
        string memory sub,
        string memory data
    ) external returns (bool);

    // Function to receive event requests
    function receiveEventRequest(
        string memory sub,
        string memory data
    ) external returns (bool);
}

contract EEMT is IEEMT {
    // İzin verilen göndericilerin listesi
    mapping(address => bool) public allowedSenders;
    // Yönetici adresi
    address public admin;

    constructor(address _admin) {
        // Kontratı oluşturan adresi yönetici olarak ata
        admin = _admin;
    }

    // Yalnızca yönetici tarafından çağrılabilir modifier
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    // Yönetici adresini değiştiren fonksiyon
    function changeAdmin(address newAdmin) public override onlyAdmin {
        admin = newAdmin;
    }

    // İzin verilen gönderici listesine adres ekleyen fonksiyon
    function addAllowedSender(address _sender) public override onlyAdmin {
        allowedSenders[_sender] = true;
    }

    // İzin verilen gönderici listesinden adres çıkaran fonksiyon
    function removeAllowedSender(address _sender) public override onlyAdmin {
        allowedSenders[_sender] = false;
    }
    // EventLog olayını tetikleyen fonksiyon
    function emitEvent(
        string memory sub,
        string memory data
    ) public override returns (bool) {
        require(allowedSenders[msg.sender], "Sender not allowed");
        uint256 currentTime = block.timestamp;
        emit EventLog(msg.sender, sub, currentTime, data);
        return true;
    }

    // Dışarıdan olay istekleri alabilen fonksiyon
    function receiveEventRequest(
        string memory sub,
        string memory data
    ) external override returns (bool) {
        require(allowedSenders[msg.sender], "Sender not allowed");
        return emitEvent(sub, data);
    }
}
