import LinkedList from './linked-list.mjs';

class HashMap {
  buckets = new Array(16);
  loadFactor = 0.75;

  constructor() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.buckets.length;
  }

  set(key, value) {
    const index = this.hash(key);
    console.log('new item index:', index);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    // If this key already exists in the bucket, rewrite its value
    let currentElement = this.buckets[index].head;

    while (currentElement) {
      if (currentElement.value.key === key) {
        currentElement.value.value = value;
        return;
      }
      currentElement = currentElement.nextNode;
    }

    // If key does not exist
    // Check if it's time to grow the table

    // Add the new element
    this.buckets[index].append({ key, value });
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    let currentElement = this.buckets[index].head;

    while (currentElement) {
      if (currentElement.value.key === key) {
        return currentElement.value.value;
      }

      currentElement = currentElement.nextNode;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    let currentElement = this.buckets[index].head;

    while (currentElement) {
      if (currentElement.value.key === key) {
        return true;
      }

      currentElement = currentElement.nextNode;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }

    const bucket = this.buckets[index];
    let currentElement = bucket.head;
    console.log(currentElement.value);

    while (currentElement) {
      // Still have to iterate through the list because we do not know key:value, only value from the beginning
      if (currentElement.value.key === key) {
        const listIndex = bucket.find(currentElement.value);
        bucket.removeAt(listIndex);
        return true;
      }

      currentElement = currentElement.nextNode;
    }

    return false;
  }

  length() {
    let storedKeysCount = 0;

    for (const bucket of this.buckets) {
      // empty buckets have a size of 0
      storedKeysCount += bucket.size;
    }

    return storedKeysCount;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];

      while (bucket.size > 0) {
        bucket.pop();
      }
    }
  }

  keys() {
    let storedKeys = [];
    for (const bucket of this.buckets) {
      let currentElement = bucket.head;

      while (currentElement) {
        storedKeys.push(currentElement.value.key);
        currentElement = currentElement.nextNode;
      }
    }

    return storedKeys;
  }

  values() {
    let storedValues = [];
    for (const bucket of this.buckets) {
      let currentElement = bucket.head;

      while (currentElement) {
        storedValues.push(currentElement.value.value);
        currentElement = currentElement.nextNode;
      }
    }

    return storedValues;
  }

  entries() {
    let storedEntries = [];

    for (const bucket of this.buckets) {
      let currentElement = bucket.head;

      while (currentElement) {
        storedEntries.push(currentElement.value);
        currentElement = currentElement.nextNode;
      }
    }

    return storedEntries;
  }
}

const hashMap = new HashMap();

hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
hashMap.set('dog', 'brown');
hashMap.set('dog', 'white');
hashMap.set('elephant', 'gray');

// console.table(JSON.stringify(hashMap));

console.log(hashMap.get('dog'));
console.log(hashMap.has('dog'));
console.log(hashMap.remove('elephant'));
console.log(hashMap.has('elephant'));

console.log(hashMap.length());

console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
