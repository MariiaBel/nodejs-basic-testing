// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import { BankAccount } from './index';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {

  let balance = 100,
      fetchBalance = 50,
      withdraw = 200,
      withdrawLess = 50,
      transferring = 200,
      transferringLess = 20,
      deposit = 200,
      bankAccountInstance:BankAccount,
      bankAccountInstanceSecond:BankAccount;

  beforeEach(() => {
    bankAccountInstance = getBankAccount(balance),
    bankAccountInstanceSecond = getBankAccount(balance);
  })

  afterEach(() => {
    // jest.clearAllMocks()
    jest.unmock('lodash')
  })

  test('should create account with initial balance', () => {
    expect(bankAccountInstance.getBalance()).toBe(balance)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccountInstance.withdraw(withdraw)
    }).toThrow(new InsufficientFundsError(balance))
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccountInstance.transfer(transferring, bankAccountInstanceSecond)
    }).toThrow(new InsufficientFundsError(balance))
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccountInstance.transfer(transferring, bankAccountInstance)
    }).toThrow(new TransferFailedError())
  });

  test('should deposit money', () => {
    const afterDepositInstance = bankAccountInstance.deposit(deposit)
    expect(afterDepositInstance.getBalance()).toEqual(balance + deposit)
  });

  test('should withdraw money', () => {
    const afterWithdrawInstance = bankAccountInstance.withdraw(withdrawLess)
    expect(afterWithdrawInstance.getBalance()).toEqual(balance - withdrawLess)
  });

  test('should transfer money', () => {
    const afterTransferInstance = bankAccountInstance.transfer(transferringLess, bankAccountInstanceSecond)
    expect(afterTransferInstance.getBalance()).toEqual(balance - transferringLess)
    expect(bankAccountInstanceSecond.getBalance()).toEqual(balance + transferringLess)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.mocked(random).mockReturnValue(fetchBalance)
    const fetchedBalance = await bankAccountInstance.fetchBalance();
    expect(typeof fetchedBalance).toBe('number')
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccountInstance, 'fetchBalance').mockResolvedValue(fetchBalance)
    await bankAccountInstance.synchronizeBalance();
    expect(bankAccountInstance.getBalance()).toEqual(fetchBalance)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccountInstance, 'fetchBalance').mockResolvedValue(null)
    expect(async() => {
      await bankAccountInstance.synchronizeBalance();
    }).rejects.toThrow(new SynchronizationFailedError())
  });
});
