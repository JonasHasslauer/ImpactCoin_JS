
//contract ImpactCoin is // https://eips.ethereum.org/EIPS/eip-20;
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <= 0.8.19;

interface Token {

  /// @param _owner The address from which the balance will be retrieved
  /// @return balance the balance
  function balanceOf(address _owner) external view returns (uint256 balance);

  /// @notice send `_value` token to `_to` from `msg.sender`
  /// @param _to The address of the recipient
  /// @param _value The amount of token to be transferred
  /// @return success Whether the transfer was successful or not
  function transferCoins(address _to, uint256 _value)  external returns (bool success);

  /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
  /// @param _from The address of the sender
  /// @param _to The address of the recipient
  /// @param _value The amount of token to be transferred
  /// @return success Whether the transfer was successful or not
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

  /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
  /// @param _spender The address of the account able to transfer the tokens
  /// @param _value The amount of wei to be approved for transfer
  /// @return success Whether the approval was successful or not
  function approve(address _spender  , uint256 _value) external returns (bool success);

  /// @param _owner The address of the account owning tokens
  /// @param _spender The address of the account able to transfer the tokens
  /// @return remaining Amount of remaining tokens allowed to spent
  function allowance(address _owner, address _spender) external view returns (uint256 remaining);

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract ImpactCoin is Token {
  uint256 constant private MAX_UINT256 = 2**256 - 1;
  mapping (address => uint256) public balances;
  mapping (address => uint256) public payout;
  mapping (address => mapping (address => uint256)) public allowed;
  uint256 public totalSupply;

  string public name;                   //fancy name: eg Simon Bucks
  uint8 public decimals;                //How many decimals to show.
  string public symbol;
  address initialCoinOwner;             //An identifier: eg SBX
  uint256 max_payout;

  constructor(uint256 _initialAmount, string memory _tokenName, uint8 _decimalUnits, string  memory _tokenSymbol, uint256 _payoutAmount) {
    balances[address(this)] = _initialAmount;
    initialCoinOwner = address(this);
    max_payout = _payoutAmount;
    totalSupply = _initialAmount;                        // Update total supply
    name = _tokenName;                                   // Set the name for display purposes
    decimals = _decimalUnits;                            // Amount of decimals for display purposes
    symbol = _tokenSymbol;                               // Set the symbol for display purposes
  }

  /*
  Berechnung der einzelnen Werte für Gehen oder Baum pflanzen fehlt noch
  */
  function calculateReward(string memory action) public returns (uint256){

  }

  function transferCoins(address _to, uint256 _value) public override returns (bool success) {
    //transfers only coins, if the receiver got less than <payout_per_Week> coins - in this case 5 times
    if (payout[_to] < max_payout){
      require(balances[msg.sender] >= _value, "token balance is lower than the value requested");
      balances[msg.sender] -= _value;
      balances[_to] += _value;
      emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
      payout[_to] += 1;
      return true;
    }else return false;
  }

  function requestCoins(uint _value) public returns (bool success){
    if (payout[msg.sender] < max_payout){
    require(balances[address(this)] >= _value, "token balance is lower than the value requested");
    balances[address(this)] -= _value;
    balances[msg.sender] += _value;
      payout[msg.sender] += _value;
    emit Transfer(address(this), msg.sender, _value); //solhint-disable-line indent, no-unused-vars
      return true;
    }else return false;
  }

  function getPayoutAmount() public view returns (uint amount){
    return payout[msg.sender];
  }

  function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
    uint256 allowance = allowed[_from][msg.sender];
    require(balances[_from] >= _value && allowance >= _value, "token balance or allowance is lower than amount requested");
    balances[_to] += _value;
    balances[_from] -= _value;
    if (allowance < MAX_UINT256) {
      allowed[_from][msg.sender] -= _value;
    }
    emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
    return true;
  }

  function balanceOf(address _owner) public override view returns (uint256 balance) {
    return balances[_owner];
  }

  function approve(address _spender, uint256 _value) public override returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
    return true;
  }

  function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }

  function get_CoinOwner_Address() public view returns(address coinOwner){
    return initialCoinOwner;
  }

  function getBalance(address addr) public view returns(uint) {
    return balances[addr];
  }

}