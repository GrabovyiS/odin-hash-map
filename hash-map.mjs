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
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
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
    if (this.length() > this.buckets.length * this.loadFactor) {
      this.grow();
    }

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

  grow() {
    const oldBuckets = this.buckets;
    this.buckets = new Array(oldBuckets.length * 2);

    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = new LinkedList();
    }

    for (let i = 0; i < oldBuckets.length; i++) {
      const bucket = oldBuckets[i];
      let currentElement = bucket.head;

      // Move old values to the new array
      // This allows us to give new hashes for a larger table
      // And just keep using the hash table as if it always was this size
      while (currentElement) {
        this.set(currentElement.value.key, currentElement.value.value);
        currentElement = currentElement.nextNode;
      }
    }
  }
}

const hashMap = new HashMap();

hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
console.log('Entries before clear():', hashMap.entries());
hashMap.clear();
console.log('Entries after clear():', hashMap.entries());

hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');

hashMap.set('dog', 'brown');
hashMap.set('dog', 'white');

hashMap.set('elephant', 'gray');
hashMap.set('frog', 'green');
hashMap.set('toad', 'dark-green');
hashMap.set('grape', 'purple');
hashMap.set('hat', 'black');
hashMap.set('jeans', 'blue');
hashMap.set('ice cream', 'white');
hashMap.set('jacket', 'blue');
hashMap.set('kite', 'pink');
hashMap.set('lion', 'golden');

console.log(hashMap.get('dog'));
console.log(hashMap.has('dog'));
console.log(hashMap.remove('elephant'));
console.log(hashMap.has('elephant'));

console.log(hashMap.length());

console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

// Time to grow the table
console.log('hashMap number of buckets before grow:', hashMap.buckets.length);
console.log('hashMap number of keys before grow:', hashMap.length());
hashMap.set('moon', 'silver');
console.log('hashMap number of buckets after grow:', hashMap.buckets.length);
