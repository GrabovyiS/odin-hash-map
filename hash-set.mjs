import LinkedList from './linked-list.mjs';

class HashSet {
  buckets = new Array(16);
  loadFactor = 0.75;
  totalKeys = 0;

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

  set(key) {
    const index = this.hash(key);

    if (this.buckets[index].find(key)) {
      return;
    }

    if (this.totalKeys > this.buckets.length * this.loadFactor) {
      this.grow();
    }

    this.buckets[index].append(key);
    this.totalKeys++;
  }

  has(key) {
    const index = this.hash(key);

    const elementIndexInList = this.buckets[index].find(key);

    if (elementIndexInList || elementIndexInList === 0) {
      return true;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    const elementIndexInList = this.buckets[index].find(key);

    if (elementIndexInList || elementIndexInList === 0) {
      this.buckets[index].removeAt(elementIndexInList);
      this.totalKeys--;
    }

    return false;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];

      while (bucket.size > 0) {
        bucket.pop();
      }

      this.totalKeys = 0;
    }
  }

  keys() {
    let storedKeys = [];
    for (const bucket of this.buckets) {
      let currentElement = bucket.head;

      while (currentElement) {
        storedKeys.push(currentElement.value);
        currentElement = currentElement.nextNode;
      }
    }

    return storedKeys;
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

      while (currentElement) {
        this.set(currentElement.value.key);
        currentElement = currentElement.nextNode;
      }
    }
  }
}

const hashSet = new HashSet();

hashSet.set('bob');
hashSet.set('bill');
hashSet.set('bibothy');

console.log(hashSet, hashSet.keys());

console.log(hashSet.has('bob'));
console.log(hashSet.has('bib'));

console.log(hashSet.totalKeys);

hashSet.remove('bob');
console.log(hashSet.has('bob'));
console.log(hashSet.totalKeys);

hashSet.clear();
console.log(hashSet.keys(), hashSet.totalKeys);
