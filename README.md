#Odin hash map
Some notes about this implementation of hash map from the curriculum.

Firstly, it suggests that every time you access a bucket with an index, you should use a check like this:

```
if (index < 0 || index >= this.buckets.length) {
  throw new Error('Trying to access index out of bound');
}
```

To prevent accessing array elements which are out of bounds, so to speak, which is possible in JS and would just return undefined.
It seems unnecessary from functional point of view since the only index I would use to access a bucket is a return value from a hash function and I can make a hash function only return values that are in bounds of the array. It is fine (and still probably safer) to work around this language feature though.

Secondly, the idea of growing the table when there are too many items for too little buckets seems strange. Why not just use a massive array in the first place and not spend a bunch of time (with O(n) to copy every data entry from the old table) copying data in favour of memory? (memory is cheap no?) But it is an interesting concept for optimizing space. It also just might work better in case our table gets SUUUPER large, larger than what we could anticipate in the beginning.

Thirdly, making .length a method that traverses the whole DS with O(n) and counts up the elements seems time inefficient. Instead of this, one could keep track of the length inside methods like set() and remove(), adding a constant number of steps to each of these operations for a trade off of having .length at constant time. That might be important because on every call of set() you make a check to see if it is time to grow the table using .length. If getting length is in O(n) time, set() is now executed in O(n) time as well, which means we loose a good chunk of the time complexity appeal of hash table with this implementation.

Lastly, it would be nice to utilize more of the LinkedList methods from the previous assignment here, but some of them just were not optimized for working with lists of objects and not primitives. For example, a .find(value) in a "primitives" list searches by value. When working with key-value pairs, we would like to search by keys, not by equality of the whole objects. It would also be nice to have a linked list method that would return the contents of the list as an array. I didn't refactor the linked list for the hash-map.

I took some of these considerations into account when implementing hash-set.
