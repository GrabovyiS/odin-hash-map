class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  head = null;
  size = 0;
  tail = null;

  append(value) {
    const newNode = new Node(value);

    // If it is the first element of the list
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  prepend(value) {
    const newNode = new Node(value);

    // If it is the first element of the list
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }

    this.size++;
  }

  at(index) {
    if (index < 0) {
      return false;
    }

    if (index > this.size - 1) {
      return false;
    }

    let i = 0;
    let currentElement = this.head;
    while (i !== index) {
      currentElement = currentElement.nextNode;
      i++;
    }

    return currentElement;
  }

  pop() {
    if (this.size === 0) {
      return false;
    }

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }

    let secondLastElement = this.head;

    while (secondLastElement.nextNode !== this.tail) {
      secondLastElement = secondLastElement.nextNode;
    }

    this.tail = secondLastElement;
    secondLastElement.nextNode = null;

    this.size--;
  }

  contains(value) {
    let currentElement = this.head;
    while (currentElement) {
      if (currentElement.value === value) {
        return true;
      }
      currentElement = currentElement.nextNode;
    }

    return false;
  }

  find(value) {
    let i = 0;
    let currentElement = this.head;
    while (currentElement) {
      if (currentElement.value === value) {
        return i;
      }
      currentElement = currentElement.nextNode;
      i++;
    }

    return false;
  }

  toString() {
    let string = '';

    let currentElement = this.head;
    while (currentElement) {
      string = string + `( ${currentElement.value} ) -> `;
      currentElement = currentElement.nextNode;
    }

    // When we have reached the tail
    string = string + 'null';
    return string;
  }

  insertAt(value, index) {
    if (index < 0) {
      return false;
    }

    // First/last as edge cases to not manage tail/head later
    if (index >= this.size - 1) {
      // Could return false when index > this.size - 1 but
      this.append(value);
      return;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    let i = 0;
    let currentElement = this.head;
    let previousElement;

    while (i !== index) {
      previousElement = currentElement;
      currentElement = currentElement.nextNode;
      i++;
    }

    // When we arrive at the index, currentElement is now stored at that index
    const newNode = new Node(value);
    previousElement.nextNode = newNode;
    newNode.nextNode = currentElement;

    this.size++;
  }

  removeAt(index) {
    if (index < 0) {
      return false;
    }

    // First/last as edge cases to not manage tail/head later
    if (index === 0) {
      this.head = this.head.nextNode;
    }

    if (index === this.size - 1) {
      this.pop();
    }

    if (index > this.size - 1) {
      return false;
    }

    let i = 0;
    let currentElement = this.head;
    let previousElement;

    while (i !== index) {
      previousElement = currentElement;
      currentElement = currentElement.nextNode;
      i++;
    }

    // When we arrive at the index, currentElement is now stored at that index
    previousElement.nextNode = currentElement.nextNode;

    this.size--;
  }

  toArray() {
    let array = [];

    let currentElement = this.head;
    while (currentElement) {
      array.push(currentElement.value);
      currentElement = currentElement.nextNode;
    }

    return array;
  }
}

export default LinkedList;
