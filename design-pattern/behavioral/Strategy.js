// Behavioral Design Patterns

// Strategy 策略

class ShoppingCart {
  constructor(discount) {
    this.discount = discount;
    this.amount = 0;
  }

  checkout() {
    return this.discount(this.amount);
  }

  setAmount(amount) {
    this.amount = amount;
  }
}

function guestPattern(amount) {
  return amount;
}

function regularPattern(amount) {
  return amount * 0.9;
}

function premiumPattern(amount) {
  return amount * 0.8;
}

const guestCart = new ShoppingCart(guestPattern);
const regularCart = new ShoppingCart(regularPattern);
const premiumCart = new ShoppingCart(premiumPattern);
