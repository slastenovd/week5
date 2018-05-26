# Неделя 5. 

## Easy

Ссылка на контракт https://rinkeby.etherscan.io/address/0xe4439f6ca668ccf1344f726439fd2c428cd6fdfd
https://gateway.ipfs.io/ipns/QmUeZUFHrU4BZNRecNbcZd2kWf5Z91gYvTnKurdfY3VRFC


## Medium
в разработке

https://github.com/slastenovd/week5/blob/master/contracts/Student.sol
```
/*
	Идея dapp

	родители отправяют ребенка на учебу в другой город/страну
	и определяют ему финансирование на семестр
	чтобы студент не пропил сразу все в барах с друзьями, родители решают 
	что деньги ему будут перечилсляться не сразу, а равномерно на протяжении всего семестра

	при формировании контракта вносится:
	1. адрес студента для выплат
	2. продолжительность контракта в днях

	Студент вызывает метод getMyMoney() и получает сумму на свой адрес 

*/



pragma solidity ^0.4.20;

contract Student {
    address public owner;
    address public student;
    uint256 public contractDuration;
    uint256 public contractStartTime;
    uint256 public amount; // итоговая сумма средств контракта
    uint256 public payed; // итоговая выплаченная сумма

    constructor(address _student, uint256 _contractDuration) public {
        owner = msg.sender;
        student = _student;
        contractDuration = _contractDuration;
        contractStartTime = now;
    }

    function getMyMoney() public {
    	require( msg.sender == student );
    	require( this.balance > 0 ); // нечего отправлять

    	uint256 diff = (now - contractStartTime) / 60 / 60 / 24; // Прошло дней с начала контракта

    	if( diff >= contractDuration ) selfdestruct(student); // Если срок контракта истек - перечисляем весь остаток студенту

    	uint256 payment = diff / contractDuration * amount; // сумма к выплате на текущий момент

        if( payment >= payed ) {
            payment = payment - paid;
            if ( payment <= this.balance ) student.send(payment);    
        }

    	
    }

    function() public payable {
    	amount = amount + msg.value;
    }
}
```